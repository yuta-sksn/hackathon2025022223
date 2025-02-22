import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Auth,
  User,
  getAuth,
  signOut,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from 'firebase/auth';
import {
  AuthFormValues,
  FirebaseAuthResult,
  UserByResource,
} from '@/features/auth/types';
import { initializeFirebase } from '@/libs/firebase-config';
import { assertIsDefined } from '@/utils/assert';
import { FetchRequestError, responseToModelObject } from '@/utils/fetcher';
import { FirebaseError } from 'firebase/app';

export const doAuthByFirebase = async (
  isRegister: boolean,
  values: AuthFormValues,
) => {
  const { auth } = initializeFirebase();

  if (isRegister) {
    return await doRegister(auth, values).then((res) => res);
  } // アカウント登録
  else {
    return await doLogin(auth, values).then((res) => res);
  } // ログイン
};

const doRegister = async (
  auth: Auth,
  registerValues: AuthFormValues,
): Promise<FirebaseAuthResult> => {
  let result = {
    success: false,
    message: '',
    user: {} as User,
  };

  // Firebase で用意されているユーザー登録の関数
  await createUserWithEmailAndPassword(
    auth,
    registerValues.email,
    registerValues.password,
  )
    .then((userCredential) => {
      // ユーザー登録すると自動的にログインされて userCredential.user でユーザーの情報を取得できる
      const user = userCredential.user;
      result = {
        success: true,
        message: '',
        user,
      };
    })
    .catch((error) => {
      // エラー出力
      console.error(error);

      let message = '';

      if (error.code === 'auth/email-already-in-use') {
        // @TODO: 脆弱性の元になるため、後ほどメッセージ内容を変更する
        message = 'このメールアドレスは既に使用されています。';
      } else if (error.code === 'auth/weak-password') {
        // @TODO: Firebase 側で設定したパスワード強度に反した場合の適切なエラーメッセージに変更する
        // (フロントエンドでバリデーションは行うが、こちらでもハンドリングを行う)
        message = '強度の弱いパスワードです。';
      }

      result = {
        success: false,
        message,
        user: {} as User,
      };
    });

  return result;
};

const doLogin = async (
  auth: Auth,
  registerValues: AuthFormValues,
): Promise<FirebaseAuthResult> => {
  let result = {
    success: false,
    message: '',
    user: {} as User,
  };

  // Firebase で用意されているユーザーログインの関数
  await signInWithEmailAndPassword(
    auth,
    registerValues.email,
    registerValues.password,
  )
    .then((userCredential) => {
      // ログインを行い userCredential.user でユーザーの情報を取得できる
      const user = userCredential.user;
      result = {
        success: true,
        message: '',
        user,
      };
    })
    .catch((error) => {
      // エラー出力
      console.error(error);

      let message = '';

      if (error.code === 'auth/invalid-credential') {
        // メールアドレス or パスワードの誤り
        message = 'メールアドレスかパスワードに誤りがあります。';
      } else if (error.code === 'auth/too-many-requests') {
        // ログインに5回失敗した場合
        message =
          'ログインに失敗した回数が多いため、このアカウントへのアクセスが一時的に無効になっています。パスワードをリセットすることですぐに元に戻すことができます。';
      }

      result = {
        success: false,
        message,
        user: {} as User,
      };
    });

  console.log(result);

  return result;
};

export const sendPasswordResetEmailByFirebase = async (email: string) => {
  const { auth } = initializeFirebase();

  let result = {
    success: false,
    message: '',
  };

  await sendPasswordResetEmail(auth, email)
    .then(() => {
      // メール送信成功
      result = {
        success: true,
        message: '',
      };
    })
    .catch((error) => {
      let message;
      switch (error.code) {
        case 'auth/invalid-email':
          message =
            '無効なメールアドレスです。正しいメールアドレスを入力してください。';
          break;
        case 'auth/user-not-found':
          message =
            'このメールアドレスに関連付けられたユーザーが見つかりません。';
          break;
        default:
          message =
            'パスワードリセットメールの送信中にエラーが発生しました。もう一度お試しください。';
          break;
      }
      result = { success: false, message };
      console.error('Send password reset email: ', message);
    });

  return result;
};

const _getResetPasswordErrorMessage = (error: any) => {
  switch (error.code) {
    case 'auth/expired-action-code':
      return 'このパスワード再設定リンクは期限切れです。新しいリンクをリクエストしてください。';
    case 'auth/invalid-action-code':
      return 'このパスワード再設定リンクは無効です。新しいリンクをリクエストしてください。';
    case 'auth/user-not-found':
      return 'このメールアドレスに関連付けられたユーザーが見つかりません。';
    case 'auth/weak-password':
      return '強度の弱いパスワードです。もう一度お試しください。';
    default:
      return 'パスワード再設定中にエラーが発生しました。もう一度お試しください。';
  }
};

export const verifyPasswordResetCodeByFirebase = async (actionCode: string) => {
  const { auth } = initializeFirebase();

  let result = {
    success: false,
    message: '',
  };

  await verifyPasswordResetCode(auth, actionCode)
    .then(async (_res) => {
      result = { success: true, message: '' };
    })
    .catch((error) => {
      const message = _getResetPasswordErrorMessage(error);
      result = { success: false, message };
      console.error('Verify password reset code: ', message);
    });

  return result;
};

export const resetPasswordByFirebase = async (
  actionCode: string,
  password: string,
) => {
  const { auth } = initializeFirebase();

  let result = {
    success: false,
    message: '',
  };

  await verifyPasswordResetCode(auth, actionCode)
    .then(async (_res) => {
      await confirmPasswordReset(auth, actionCode, password)
        .then((_res) => {
          result = { success: true, message: '' };
        })
        .catch((error) => {
          const message = _getResetPasswordErrorMessage(error);
          result = { success: false, message };
          console.error('Confirm password reset: ', message);
        });
    })
    .catch((error) => {
      const message = _getResetPasswordErrorMessage(error);
      result = { success: false, message };
      console.error('Verify password reset code: ', message);
    });

  return result;
};

export const doAuthByResource = async (
  isRegister: boolean,
  headers: {
    [key: string]: string;
  },
  init: RequestInit = {
    mode: 'cors',
    method: isRegister ? 'PUT' : 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  },
): Promise<UserByResource> => {
  // API Base URL を取得
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  // env に定義されていなければ、ランタイムエラーを発生させる
  assertIsDefined(apiBaseUrl);
  // Fetch API でリクエストを送信
  const result = await fetch(
    `${apiBaseUrl}${isRegister ? '/v1/account/signup' : '/v1/account/login'}`,
    init,
  )
    .then(async (res: Response) => {
      // OK 以外なら FetchRequestError Object を throw し .catch のエラーハンドリングに移行
      if (!res.ok) {
        throw {
          errObj: new Error(res.statusText),
          response: await res.json(),
        };
      }

      return res.json();
    })
    .catch((err) => {
      // FetchRequestError を catch
      const fetchError = err as FetchRequestError;
      // エラー処理 (エラーをログに出力したり、Sentry に通知する)
      console.error(fetchError.errObj);
      // 呼び出し元にエラーレスポンスをスローする
      throw fetchError;
    });

  return responseToModelObject(result);
};

export const doLogout = async (user: User) => {
  try {
    // Firebase Authentication をログアウト
    await doLogoutByFirebase();
    // ジモニッチ API でログアウト
    await doLogoutByResource({
      // @ts-ignore
      Authorization: `Bearer ${user.accessToken}`,
    });
  } catch (e) {
    console.error(e);
  }
};

const doLogoutByFirebase = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
  } catch (e) {
    if (e instanceof FirebaseError) {
      console.error(e);
    }
  }
};

const doLogoutByResource = async (
  headers: {
    [key: string]: string;
  },
  init: RequestInit = {
    mode: 'cors',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  },
) => {
  // API Base URL を取得
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  // env に定義されていなければ、ランタイムエラーを発生させる
  assertIsDefined(apiBaseUrl);
  // Fetch API でリクエストを送信
  await fetch(`${apiBaseUrl}/v1/account/logout`, init)
    .then(async (res: Response) => {
      // OK 以外なら FetchRequestError Object を throw し .catch のエラーハンドリングに移行
      if (!res.ok) {
        throw {
          errObj: new Error(res.statusText),
          response: await res.json(),
        };
      }
    })
    .catch((err) => {
      // FetchRequestError を catch
      const fetchError = err as FetchRequestError;
      // 呼び出し元にエラーレスポンスをスローする
      throw fetchError;
    });
};
