// XRChart.tsx
import { useState } from "react";

export const XRChart = ({ batches, onClose }: any) => {
  const [result, setResult] = useState<any>(null);

  const buildChart = () => {
    const stats = batches.map((b: number[]) => {
      const mean = b.reduce((a, c) => a + c, 0) / b.length;
      const range = Math.max(...b) - Math.min(...b);
      return { mean, range };
    });

    const xBarBar =
      stats.reduce((s: number, x: any) => s + x.mean, 0) / stats.length;
    const rBar =
      stats.reduce((s: number, x: any) => s + x.range, 0) / stats.length;

    setResult({
      stats,
      limits: {
        ucl: xBarBar + 0.577 * rBar,
        cl: xBarBar,
        lcl: xBarBar - 0.577 * rBar,
      },
    });
  };

  return (
    <div style={modalStyle}>
      <h3>XR-карта</h3>

      <button onClick={buildChart}>Построить карту</button>

      {result && (
        <div style={{ marginTop: 10 }}>
          {result.stats.map((s: any, i: number) => (
            <div key={i}>
              Партия {i + 1}: X̄ = {s.mean.toFixed(3)}
            </div>
          ))}

          <hr />
          <div>UCL: {result.limits.ucl.toFixed(3)}</div>
          <div>CL: {result.limits.cl.toFixed(3)}</div>
          <div>LCL: {result.limits.lcl.toFixed(3)}</div>
        </div>
      )}

      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

const modalStyle = {
  background: "#fff",
  padding: 20,
  borderRadius: 8,
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  marginTop: 10,
};
