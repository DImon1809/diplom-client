// ProductPage.tsx
// import { product } from "../mockData";
import { ParameterCard } from "../ParameterCard";
import { useLazyCurrentQuery } from "../../store/user/userApi";

import styles from "./style.module.scss";

const product = {
  id: 1,
  name: "Поршневой палец",
  parameters: [
    {
      id: 1,
      name: "Диаметр",
      unit: "мм",
      details: [
        10.01, 10.02, 10.0, 10.03, 10.01, 10.02, 10.01, 10.02, 10.04, 10.03,
        10.01, 10.0, 10.01, 10.02, 10.01,
      ],
    },
    {
      id: 2,
      name: "Линейный размер",
      unit: "мм",
      details: [50.1, 50.2, 50.0, 50.1, 50.2, 50.0, 50.1, 50.1, 50.2, 50.1],
    },
  ],
};

export const ProductPage = () => {
  const [current] = useLazyCurrentQuery();
  return (
    <div className={styles.product__page}>
      <h1>{product.name}</h1>

      <button onClick={() => current()}>click</button>

      <div className={styles.parameters}>
        {product.parameters.map((p, key) => (
          <ParameterCard key={key} parameter={p} number={key + 1} />
        ))}
      </div>
    </div>
  );
};
