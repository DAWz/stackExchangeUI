import React from "react";
import styles from "./Spinner.module.css";

export default function Spinner({ small }) {
  return (
    <div className={styles.spinningContainer}>
      <div
        className={small ? styles.smallSpinner : styles.loadingSpinner}
      ></div>
    </div>
  );
}
