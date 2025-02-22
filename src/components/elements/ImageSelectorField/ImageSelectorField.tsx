'use client';

import {
  InputHTMLAttributes,
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { classNames } from '@/helpers/classNames';
const { v4: uuidv4 } = require('uuid');
import Image from 'next/image';

import classes from './ImageSelectorField.module.scss';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';

type ImageSelectorFieldProps = {
  maxImagesUpload?: number;
  register: UseFormRegisterReturn;
  setValue: UseFormSetValue<any>;
} & InputHTMLAttributes<HTMLInputElement>;

const ImageSelectorField = ({
  maxImagesUpload = 3,
  register,
  setValue,
  className,
  ...props
}: ImageSelectorFieldProps) => {
  const { ref, ...rest } = register;
  const inputFilesLabelRef = createRef<HTMLLabelElement>();
  const inputFilesRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<File[]>([]);

  // 画像の追加
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const dt = new DataTransfer();

    images.forEach((file) => dt.items.add(file));

    files.forEach((file) => {
      if (maxImagesUpload > dt.items.length) {
        dt.items.add(file);
        setImages((currentImages) => [...currentImages, file]);
      }
    });

    e.target.files = dt.files;

    // setValue 経由で React hook form 側へ選択したファイルを渡す
    setValue(register.name, Array.from(e.target.files).concat(), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // 画像の削除
  const handleRemoveImage = (index: number) => {
    // 選択した画像を削除
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    // DataTransfer を使用して input と React hook form 側の value を更新する
    const dt = new DataTransfer();
    newImages.forEach((file) => dt.items.add(file));
    (inputFilesRef.current as HTMLInputElement).files = dt.files;

    // setValue 経由で React hook form 側へ選択したファイルを渡す
    setValue(
      register.name,
      Array.from(
        (inputFilesRef.current as HTMLInputElement).files as FileList,
      ).concat(),
      { shouldValidate: true, shouldDirty: true },
    );
  };

  useEffect(() => {
    if (inputFilesLabelRef.current === null || inputFilesRef.current === null)
      return;

    // id と htmlFor にパラメータを動的に追加
    const inputFilesId = uuidv4();
    inputFilesLabelRef.current.htmlFor = inputFilesId;
    inputFilesRef.current.id = inputFilesId;
  }, [inputFilesLabelRef, inputFilesRef]);

  return (
    <div className={classNames(classes.imageSelectorFieldContainer, className)}>
      {images.map((image, i) => (
        <div key={i} className={classes.imageSelectorFieldThumbnailContainer}>
          {/* 削除ボタン */}
          <button
            type="button"
            className={classes.imageSelectorFieldThumbnailDelete}
            onClick={() => handleRemoveImage(i)}
          />
          <Image
            src={URL.createObjectURL(image)}
            className={classes.imageSelectorFieldThumbnail}
            width={64}
            height={64}
            alt={''}
          />
        </div>
      ))}
      <label
        ref={inputFilesLabelRef}
        className={classes.imageSelectorFieldAddImageLabel}
        style={{
          display: maxImagesUpload > images.length ? 'inline-block' : 'none',
        }}
      >
        <input
          {...rest}
          ref={(e) => {
            ref(e);
            inputFilesRef.current = e;
          }}
          name={rest.name}
          type="file"
          multiple
          accept="image/*,.png,.jpg,.jpeg,.gif"
          onChange={(e) => {
            rest.onChange(e);
            handleAddImage(e);
          }}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );
};

export default ImageSelectorField;
