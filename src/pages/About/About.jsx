import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import aboutMD from "./about.md";
import ReactMarkdown from "markdown-to-jsx";

export const About = () => {
  let [readable, setReadable] = useState({ md: "" });
  useEffect(() => {
    fetch(aboutMD)
      .then((res) => res.text())
      .then((md) => {
        setReadable({ md });
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      <strong>About Dashboard</strong>
      <div className={styles.separator} />
      <div className={styles.aboutWrapper}>
        <ReactMarkdown children={readable.md} />
      </div>
    </div>
  );
};
