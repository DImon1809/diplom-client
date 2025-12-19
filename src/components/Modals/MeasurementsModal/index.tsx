/* eslint-disable react-hooks/set-state-in-effect */
// MeasurementsModal.tsx
import { useEffect, useState } from "react";
import { Modal } from "../Modal";

import { useUpdateParamMutation } from "../../../store/params/paramsApi";

import styles from "./style.module.scss";

export const MeasurementsModal = ({ parameter, onClose }: any) => {
  const [updateParam] = useUpdateParamMutation();
  const [details, setDetails] = useState<string[]>([]);
  const [buffer, setBuffer] = useState<string>();
  const [upperLimit, setUpperLimit] = useState<string>("");
  const [lowerLimit, setLowerLimit] = useState<string>("");

  const handleSave = () => {
    if (parameter?.id && details?.length)
      updateParam({ id: parameter.id, details, upperLimit, lowerLimit });
  };

  useEffect(() => {
    if (parameter?.details?.length) {
      setDetails(parameter.details);
      setUpperLimit(parameter?.upperLimit || 0);
      setLowerLimit(parameter?.lowerLimit || 0);
    }
  }, [parameter]);

  return (
    <Modal onClose={onClose}>
      <h2>{parameter.name} — измерения</h2>

      <div className={styles.details}>
        {details?.length ? (
          details?.map((detail, key) => (
            <div key={key} className={styles.detail}>
              <span>{`№${key + 1}`}</span> <span>{detail}</span>
            </div>
          ))
        ) : (
          <h4>Пока ничего нет</h4>
        )}
      </div>

      {/* <div className={styles.select__wrapper}>
        <h4>Размер подгруппы</h4>
        <select>
          <option value="5">5 элементов</option>
          <option value="6">6 элементов</option>
          <option value="7">7 элементов</option>
        </select>
      </div> */}
      <div style={{ display: "flex" }}>
        <div>
          <h3>Нижнее отклонение</h3>
          <input
            type="text"
            value={lowerLimit}
            onChange={(event) => setLowerLimit(event.target.value)}
          />
        </div>
        <div>
          <h3>Верхнее отклонение</h3>
          <input
            type="text"
            value={upperLimit}
            onChange={(event) => setUpperLimit(event.target.value)}
          />
        </div>
      </div>
      <div className={styles.add__detail}>
        <input
          type="text"
          value={buffer}
          onChange={(event) => setBuffer(event.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => {
            setBuffer("");
            setDetails((prev) => [...prev, buffer || ""]);
          }}
        >
          Добавить значение
        </button>

        <button className={styles.button} onClick={handleSave}>
          Сохранить
        </button>
      </div>
    </Modal>
  );
};
