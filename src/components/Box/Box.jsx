import React from "react";
import Spinner from "../Spinner/Spinner";
import styles from "./Box.module.css";

export const Box = ({ color, header, content, width, loading }) => {
  return (
    <div
      className={styles.wrapper}
      style={{ backgroundColor: color, width: width }}
    >
      <div className={styles.contentWrapper}>
        <strong>{header}</strong>
        <div className={styles.separator} />
        {loading ? (
          <div className={styles.loading}>
            <Spinner small />
          </div>
        ) : (
          <div className={styles.content}>{content}</div>
        )}
      </div>
    </div>
  );
};
