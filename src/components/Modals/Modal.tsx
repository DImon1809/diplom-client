import type { ReactNode } from "react";

import { IoCloseOutline } from "react-icons/io5";

import styles from "./style.module.scss";

type Props = {
  children: ReactNode;
  onClose: () => void;
};

export const Modal = ({ children, onClose }: Props) => {
  return (
    <div className={styles.modal__wrapper} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}

        <IoCloseOutline className={styles.close} size={31} onClick={onClose} />
      </div>
    </div>
  );
};
