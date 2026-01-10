import React from "react";

import { useParams, useNavigate } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

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
import { useCurrentQuery } from "../../store/user/userApi";

export const CardsPage = () => {
  useCurrentQuery();

  const { productId } = useParams();
  const navigate = useNavigate();

  const { data } = useGetAllDetailsQuery(
    { id: Number(productId) },
    { skip: !productId }
  );

  console.log(data);

  return (
    <section className={styles.cards__section}>
      <FaArrowLeft
        className={styles.arrow}
        size={31}
        onClick={() => {
          navigate("/");
        }}
      />

      <section className={styles.charts}>
        <XRmiddle
          productId={productId!}
          forbiddenText={
            data?.length < 100 ? "Должно быть больше 100 элементов" : ""
          }
        />
        <ControlChartXS
          forbiddenText={
            data?.length < 100 ? "Должно быть больше 100 элементов" : ""
          }
        />
        <ControlChartMR
          forbiddenText={
            data?.length < 100 ? "Должно быть больше 100 элементов" : ""
          }
        />
        <ControlChartIMR
          forbiddenText={
            data?.length < 100 ? "Должно быть больше 100 элементов" : ""
          }
        />
        <ControlChartCUSUM
          forbiddenText={
            data?.length < 100 ? "Должно быть больше 100 элементов" : ""
          }
        />
        <ControlChartP
          forbiddenText={
            data?.length < 1000 ? "Должно быть больше 1000 элементов" : ""
          }
        />
        <ControlChartNP
          forbiddenText={
            data?.length < 1000 ? "Должно быть больше 1000 элементов" : ""
          }
        />
        <ControlChartU
          forbiddenText={
            data?.length < 1000 ? "Должно быть больше 1000 элементов" : ""
          }
        />
        <ControlChartC
          forbiddenText={
            data?.length < 1000 ? "Должно быть больше 1000 элементов" : ""
          }
        />
      </section>
    </section>
  );
};
