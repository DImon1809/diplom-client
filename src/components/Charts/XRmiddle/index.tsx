import { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useLazyCalculateXRmiddleQuery } from "../../../store/calculate/calculateApi";

import { BuildChartLine } from "../BuildChartLine";
import { CommentCard } from "../CommentCard";

import styles from "./style.module.scss";
import { useAppSelector } from "../../../store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = { productId: string; forbiddenText: string };

interface DataItem {
  xbar: number;
  r: number;
}

export const XRmiddle = ({ productId, forbiddenText }: Props) => {
  const { parameters } = useAppSelector((state) => state.userSlice);
  const [calculate, { isLoading }] = useLazyCalculateXRmiddleQuery();
  const [chartData, setChartData] = useState<DataItem[]>([]);
  const [XbarLimits, setXbarLimits] = useState<{
    UCL: number;
    LCL: number;
  } | null>(null);
  const [comment, setComment] = useState<string>("");
  const [Rlimits, setRlimits] = useState<{ UCL: number; LCL: number } | null>(
    null
  );
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const commentRef = useRef<HTMLDivElement>(null);

  const handleClick = async () => {
    try {
      setComment("");

      const result = await calculate({ id: productId }).unwrap();

      setIsTypingComplete(false);

      setChartData(result.chartData);
      setXbarLimits(result.XbarLimits);
      setRlimits(result.Rlimits);
      setComment(result.comment);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  const scrollToComment = () => {
    if (commentRef.current) {
      commentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        if (commentRef.current) {
          commentRef.current.style.boxShadow = "none";
        }
      }, 1500);
    }
  };

  useEffect(() => {
    if (comment && !isTypingComplete) {
      const timer = setTimeout(() => {
        scrollToComment();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [comment, isTypingComplete]);

  useEffect(() => {
    const param = parameters?.find((p) => p.id === Number(productId));

    if (param?.xrMiddle) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setChartData(param.xrMiddle.chartData);
      setXbarLimits(param.xrMiddle.XbarLimits);
      setRlimits(param.xrMiddle.Rlimits);
      setComment(param.xrMiddle.comment);
    }
  }, [parameters]);

  if (!chartData.length) {
    return (
      <BuildChartLine
        text="X̄-R"
        handleClick={handleClick}
        isLoading={isLoading}
        forbiddenText={forbiddenText}
      />
    );
  }

  const labels = chartData.map((_, i) => `Подгруппа ${i + 1}`);

  const xbarChartData = {
    labels,
    datasets: [
      {
        label: "X̄ (Среднее)",
        data: chartData.map((d) => d.xbar),
        borderColor: "blue",
        backgroundColor: "blue",
        tension: 0.2,
      },
      {
        label: "UCL",
        data: Array(chartData.length).fill(XbarLimits?.UCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "LCL",
        data: Array(chartData.length).fill(XbarLimits?.LCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  const rChartData = {
    labels,
    datasets: [
      {
        label: "R (Размах)",
        data: chartData.map((d) => d.r),
        borderColor: "green",
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "UCL R",
        data: Array(chartData.length).fill(Rlimits?.UCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "LCL R",
        data: Array(chartData.length).fill(Rlimits?.LCL),
        borderColor: "red",
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  return (
    <div style={{ width: "900px", margin: "0 auto" }}>
      <h2>Контрольная карта X̄ (Средние)</h2>
      <div style={{ width: "100%", height: "500px", marginBottom: "50px" }}>
        <Line data={xbarChartData} />
      </div>

      <h2>Контрольная карта R (Размахи)</h2>
      <div style={{ width: "100%", height: "500px", marginBottom: "30px" }}>
        <Line data={rChartData} />
      </div>

      <div
        ref={commentRef}
        style={{ margin: "30px 0", scrollMarginTop: "20px" }}
      >
        <CommentCard comment={comment || ""} thinkingDelay={30} />
      </div>

      <button
        onClick={handleClick}
        disabled={isLoading}
        className={styles.repeat__button}
      >
        {isLoading ? (
          <span className={styles.loading}></span>
        ) : (
          "Обновить данные"
        )}
      </button>
    </div>
  );
};
