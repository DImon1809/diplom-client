import React from "react";

import { useParams } from "react-router-dom";

import { useGetAllDetailsQuery } from "../../store/params/paramsApi";
import { ControlChart } from "../Charts/XRmiddle";

export const CardsPage = () => {
  const { productId } = useParams();

  const { data } = useGetAllDetailsQuery(
    { id: Number(productId) },
    { skip: !productId }
  );

  console.log(data);

  return (
    <>
      <ControlChart />
    </>
  );
};
