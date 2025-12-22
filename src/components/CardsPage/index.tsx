import React from "react";

import { useParams } from "react-router-dom";

import { useGetAllDetailsQuery } from "../../store/params/paramsApi";
import { XRmiddle } from "../Charts/XRmiddle";
import { ControlChartXS } from "../Charts/ControlChartXS";
import { ControlChartMR } from "../Charts/ControlChartMr";
import { ControlChartIMR } from "../Charts/ControlChartIMr";
import { ControlChartCUSUM } from "../Charts/ControlChartCUSUM";
import { ControlChartP } from "../Charts/ControlChartP";
import { ControlChartNP } from "../Charts/ControlChartNP";
import { ControlChartU } from "../Charts/ControlChartU";
import { ControlChartC } from "../Charts/ControlChartC";

import styles from "./style.module.scss";

export const CardsPage = () => {
  const { productId } = useParams();

  const { data } = useGetAllDetailsQuery(
    { id: Number(productId) },
    { skip: !productId }
  );

  console.log(data);

  return (
    <section className={styles.cards__section}>
      <XRmiddle />
      <ControlChartXS />
      <ControlChartMR />
      <ControlChartIMR />
      <ControlChartCUSUM />
      <ControlChartP />
      <ControlChartNP />
      <ControlChartU />
      <ControlChartC />
    </section>
  );
};
