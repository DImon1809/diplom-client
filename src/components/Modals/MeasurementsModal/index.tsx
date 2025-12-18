// MeasurementsModal.tsx
import { useState } from "react";
import { Modal } from "../Modal";
import { BatchBlock } from "../../BatchBlock";

import styles from "./style.module.scss";

export const MeasurementsModal = ({ parameter, onClose }: any) => {
  return (
    <Modal onClose={onClose}>
      <h2>{parameter.name} — измерения</h2>

      <div className={styles.details}>
        {parameter?.details?.length ? (
          parameter?.details?.map((detail, key) => (
            <div key={key} className={styles.detail}>
              <span>{`№${key + 1}`}</span> <span>{detail}</span>
            </div>
          ))
        ) : (
          <h4>Пока ничего нет</h4>
        )}
      </div>

      <div className={styles.select__wrapper}>
        <h4>Размер подгруппы</h4>
        <select>
          <option value="5">5 элементов</option>
          <option value="6">6 элементов</option>
          <option value="7">7 элементов</option>
        </select>
      </div>
      <div className={styles.add__detail}>
        <input type="text" />
        <button className={styles.button}>Добавить партию</button>
      </div>
    </Modal>
  );
};
