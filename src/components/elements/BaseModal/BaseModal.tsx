'use client';

import { HTMLAttributes, ReactNode, useEffect } from 'react';
import { classNames } from '@/helpers/classNames';

import classes from './BaseModal.module.scss';
import { SetterOrUpdater } from 'recoil';
import { ModalStateProps } from '@/libs/recoil/types';

type BaseModalProps = {
  modalState: [ModalStateProps, SetterOrUpdater<ModalStateProps>];
  modalTitle: string;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const BaseModal = ({
  modalState,
  modalTitle,
  children,
  className,
  ...props
}: BaseModalProps) => {
  const [modal, setModal] = modalState;

  const handleModalClose = () => {
    setModal({ isOpen: false });
  };

  return (
    <div
      className={classNames(
        classes.baseModalWrapper,
        modal.isOpen
          ? classes.baseModalWrapperIsOpen
          : classes.baseModalWrapperIsClose,
      )}
    >
      <a onClick={handleModalClose} className={classes.baseModalOverlay}></a>
      <div className={classes.baseModalWindow}>
        <div className={classes.baseModalContent}>
          <p className={classes.baseModalTitle}>{modalTitle}</p>
          {children}
        </div>
        <a onClick={handleModalClose} className={classes.baseModalClose}>
          ×
        </a>
      </div>
    </div>
  );
};

export default BaseModal;
