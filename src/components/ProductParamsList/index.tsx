import React from "react";

import styles from "./style.module.scss";

const params = ["Диаметр"];

export const ProductParamsList = () => {
  return (
    <section>
      <h3>Изделие - Поршневой палец</h3>
      <section>
        <h4>Список параметров</h4>
        <div>
          {params.map((param, key) => (
            <div key={key}>
              <span>{key + 1}</span>
              <span>{param}</span>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};
