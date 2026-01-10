import React from "react";

import styles from "./style.module.scss";

type Props = {
  text: string;
  isLoading: boolean;
  forbiddenText: string;
  handleClick: () => void;
};

export const BuildChartLine = ({
  text,
  isLoading,
  forbiddenText,
  handleClick,
}: Props) => {
  return (
    <div className={styles.chart__line}>
      <div className={styles.text__wrapper}>
        <span className={styles.text}>{`Нажмите для построения ${text}`}</span>

        <span className={styles.alert}>{forbiddenText}</span>
      </div>

      <button
        onClick={handleClick}
        disabled={isLoading || !!forbiddenText}
        className={`${styles.build__button} ${isLoading || forbiddenText ? styles.disable : ""}`}
      >
        {isLoading ? (
          <span className={styles.loading}></span>
        ) : (
          "Построить контрольные карты"
        )}
      </button>
    </div>
  );
};
