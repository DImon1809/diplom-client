// ProductPage.tsx
// import { product } from "../mockData";
import { ParameterCard } from "../ParameterCard";
import { useCurrentQuery } from "../../store/user/userApi";

import styles from "./style.module.scss";

export const ProductPage = () => {
  const { isLoading, data } = useCurrentQuery();

  return (
    <div className={styles.product__page}>
      <h1>Поршневой палец</h1>

      {!isLoading && (
        <div className={styles.parameters}>
          {data?.parameters.map((p, key) => (
            <ParameterCard key={key} parameter={p} number={key + 1} />
          )) ?? "Ничего нет"}
        </div>
      )}
    </div>
  );
};
