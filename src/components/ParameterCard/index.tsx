// ParameterCard.tsx
import { useState } from "react";
import { MeasurementsModal } from "../Modals/MeasurementsModal";
import { XRChart } from "../XRChart";

import { useNavigate } from "react-router-dom";

import styles from "./style.module.scss";

export const ParameterCard = ({ parameter, number }: any) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showChart, setShowChart] = useState(false);

  return (
    <div className={styles.parameter__card}>
      <div onClick={() => setOpen(!open)} className={styles.parameter__wrapper}>
        <span>{`№${number}`}</span>
        <span>{`${parameter.name} ${parameter.unit}`}</span>
        <span>{`Количество внесённый данных ${parameter.details.length}`}</span>
      </div>

      {open && (
        <div className={styles.buttons}>
          <button onClick={() => setShowList(true)}>Список</button>
          <button
            style={{ marginLeft: 8 }}
            onClick={() => navigate(`/cards/${parameter?.id || ""}`)}
          >
            Контрольные карты
          </button>
        </div>
      )}

      {showList && (
        <MeasurementsModal
          parameter={parameter}
          onClose={() => setShowList(false)}
        />
      )}

      {showChart && (
        <XRChart
          batches={parameter.batches}
          onClose={() => setShowChart(false)}
        />
      )}
    </div>
  );
};
