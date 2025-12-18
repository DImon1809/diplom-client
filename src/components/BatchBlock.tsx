// BatchBlock.tsx
import { useState } from "react";

export const BatchBlock = ({
  index,
  values,
  onAdd,
}: {
  index: number;
  values: number[];
  onAdd: (value: number) => void;
}) => {
  const [input, setInput] = useState("");

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 12,
        borderRadius: 6,
        marginBottom: 10,
      }}
    >
      <b>Партия {index + 1}</b>

      <div style={{ marginTop: 6 }}>
        {values.length === 0 ? (
          <i>Нет измерений</i>
        ) : (
          values.map((v, i) => (
            <span key={i} style={chipStyle}>
              {v}
            </span>
          ))
        )}
      </div>

      <div style={{ marginTop: 8 }}>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Значение"
        />
        <button
          onClick={() => {
            if (!input) return;
            onAdd(Number(input));
            setInput("");
          }}
          style={{ marginLeft: 8 }}
        >
          Добавить
        </button>
      </div>
    </div>
  );
};

const chipStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "4px 8px",
  marginRight: 6,
  marginBottom: 6,
  background: "#f1f1f1",
  borderRadius: 4,
};
