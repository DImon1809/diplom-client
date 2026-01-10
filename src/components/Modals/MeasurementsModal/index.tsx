import { useEffect, useState } from "react";

import { FaRegTrashAlt, FaRegSave } from "react-icons/fa";
import { LuSaveAll } from "react-icons/lu";

import { Modal } from "../Modal";

import { useUpdateParamMutation } from "../../../store/params/paramsApi";

import styles from "./style.module.scss";

export const MeasurementsModal = ({ parameter, onClose }: any) => {
  const [updateParam] = useUpdateParamMutation();
  const [details, setDetails] = useState<string[]>([]);
  const [buffer, setBuffer] = useState<string>();
  const [upperLimit, setUpperLimit] = useState<string>("");
  const [lowerLimit, setLowerLimit] = useState<string>("");

  const handleSave = async () => {
    if (parameter?.id && details?.length) {
      onClose();
      await updateParam({ id: parameter.id, details, upperLimit, lowerLimit });
    }
  };

  useEffect(() => {
    if (parameter?.details?.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
              <div>
                <span>{`№${key + 1}`}</span> <span>{detail}</span>
              </div>

              <FaRegTrashAlt
                size={15}
                className={styles.trash}
                onClick={() => {
                  setDetails((details) =>
                    details?.length
                      ? [...details.filter((_, index) => index !== key)]
                      : []
                  );
                }}
              />
            </div>
          ))
        ) : (
          <h4>Пока ничего нет</h4>
        )}
      </div>

      <div className={styles.modal__footer}>
        <div className={styles.input__wrapper}>
          <input
            type="text"
            id="upper"
            placeholder=""
            className={styles.input}
            value={lowerLimit}
            onChange={(event) => setLowerLimit(event.target.value)}
          />
          <label htmlFor="upper" className={styles.label}>
            Макс. допуст. значение
          </label>
        </div>
        <div className={styles.input__wrapper}>
          <input
            type="text"
            id="lower"
            placeholder=""
            className={styles.input}
            value={upperLimit}
            onChange={(event) => setUpperLimit(event.target.value)}
          />
          <label htmlFor="lower" className={styles.label}>
            Мин. допуст. значение
          </label>
        </div>
      </div>
      <div className={styles.add__detail}>
        <input
          type="text"
          className={styles.input}
          value={buffer}
          onChange={(event) => setBuffer(event.target.value)}
          placeholder="Добавить новое значение"
        />
        <button
          className={styles.add__button}
          onClick={() => {
            setBuffer("");
            setDetails((prev) => [...prev, buffer || ""]);
          }}
        >
          Добавить
        </button>

        {/* <LuSaveAll  onClick={handleSave}/> */}
        <button className={styles.save__button} onClick={handleSave}>
          Сохранить
        </button>
      </div>
    </Modal>
  );
};
