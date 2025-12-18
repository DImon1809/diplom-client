// Modal.tsx
import React from "react";
import type { ReactNode } from "react";

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
      </div>
    </div>
  );
};
