'use client';

import { doLogout } from '@/features/auth/api/auth';
import { useAuthContext } from '@/features/auth/components/AuthProvider/AuthProvider';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const TheHeader = () => {
  const { user } = useAuthContext();

  const router = useRouter();
  const navigationPath = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navMenuItems = [
    {
      text: 'TOP',
      href: '/',
    },
    {
      text: 'My Niche',
      href: '/my-niche',
    },
    {
      text: 'About',
      href: '/about',
    },
    {
      text: 'Login',
      href: '/account/login',
    },
  ];

  // navMenu 内 Link の TW Class 群
  const navMenuLinkTwClasses = useMemo(() => {
    return (navMenuItemHref: string): string => {
      return twMerge(
        'relative inline-block',
        navigationPath === navMenuItemHref ||
          (navMenuItemHref === '/reports' &&
            (/^\/reports\/page\/\d+$/.test(navigationPath) ||
              /^\/reports\/[a-zA-Z0-9._-]+$/.test(navigationPath)))
          ? 'text-gray-400 after:absolute after:bottom-[-8px] after:left-0 after:h-[1px] after:w-full after:bg-gray-400'
          : undefined,
      );
    };
  }, [navigationPath]);

  const handleOnTapToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOnTapLink = () => {
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 200);
  };

  const handleTapLogout = () => {
    if (!user) return;

    // ログアウト
    doLogout(user);

    setTimeout(() => {
      // TOP に遷移
      router.push('/');
    }, 300);
  };

  return (
    <>
      {/* ヘッダー */}
      <header className="fixed top-0 z-[51] h-16 w-full bg-blue-500 px-6 pt-2 max-sm:pb-2 sm:relative">
        <div className="relative flex h-full items-center">
          {/* ハンバーガーメニューアイコン */}
          <button
            aria-label="メニューを開く"
            aria-expanded="false"
            aria-controls="navigation"
            className="absolute right-0 block sm:hidden"
            onClick={handleOnTapToggle}
          >
            <span className="sr-only">メニュー</span>
            <div className="relative size-6">
              {/* 三本線アイコン */}
              <svg
                className={`absolute left-0 top-0 transition-opacity duration-500 ease-in-out ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12H21M3 6H21M3 18H21"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* クロス（バツ）アイコン */}
              <svg
                className={`absolute left-0 top-0 transition-opacity duration-500 ease-in-out ${
                  isMenuOpen ? 'opacity-100' : 'opacity-0'
                }`}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>

          {/* ロゴ */}
          <Link href="/" onClick={handleOnTapLink}>
            {/* <Image
              src="/images/logo.jpg"
              alt="ジモニッチ"
              width="340"
              height="102"
              className="w-32 sm:w-full"
            /> */}
          </Link>
        </div>
      </header>

      {/* ナビゲーション */}
      <nav
        className={twMerge(
          'fixed z-50 bg-white py-3 text-gray-800 transition-all duration-500 ease-in-out max-sm:w-full max-sm:pt-0 sm:sticky sm:top-0',
          isMenuOpen ? 'top-16' : 'top-[-100%]',
        )}
      >
        <ul className="flex flex-col justify-center text-center text-sm sm:flex-row sm:text-left">
          {navMenuItems.map((item, index) => {
            if (item.href.includes('login') && user) return <></>;

            return (
              <li
                key={`nav-menu-${index}`}
                className="mx-4 py-2 max-sm:first-of-type:pt-4"
              >
                <Link
                  href={item.href}
                  className={navMenuLinkTwClasses(item.href)}
                  onClick={handleOnTapLink}
                >
                  {item.text}
                </Link>
              </li>
            );
          })}
          {user && (
            <li
              className="mx-4 cursor-pointer py-2 max-sm:first-of-type:pt-4"
              onClick={handleTapLogout}
            >
              Logout
            </li>
          )}
        </ul>
      </nav>

      {/* オーバーレイ */}
      <div
        className={twMerge(
          'fixed left-0 top-0 h-screen w-screen bg-gray-800 transition-all duration-700 ease-in-out sm:hidden',
          isMenuOpen ? 'z-[49] opacity-50' : 'z-[-1] opacity-0',
        )}
        onClick={() => {
          // Close 中の再タップ防止早期 return
          if (!isMenuOpen) return;
          handleOnTapToggle();
        }}
      />
    </>
  );
};

export default TheHeader;
