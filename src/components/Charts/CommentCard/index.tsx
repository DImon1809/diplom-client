import { useState, useEffect } from "react";

import styles from "./style.module.scss";

type Props = {
  comment: string;
  thinkingDelay?: number;
};

export const CommentCard = ({ comment, thinkingDelay = 30 }: Props) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!comment) {
      setDisplayedText("");
    }

    let index: number = 0;
    const interval = setInterval(() => {
      setDisplayedText(comment.split("").slice(0, index).join(""));

      index++;

      if (index >= comment.length - 1) {
        clearInterval(interval);
      }
    }, thinkingDelay);

    return () => clearInterval(interval);
  }, [comment, thinkingDelay]);

  return (
    <div className={styles.comment__card}>
      {displayedText?.length
        ? displayedText
            ?.split("\n")
            ?.filter((l) => l !== "NaN")
            ?.map((content, index) => {
              return (
                <p className={`${index > 0 ? styles.row : ""}`} key={index}>
                  {content}
                </p>
              );
            })
        : ""}
    </div>
  );
};
