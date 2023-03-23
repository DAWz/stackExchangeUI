import React from "react";
import styles from "./Result.module.css";

export const Result = ({ data, width, deleteFunction }) => {
  return (
    <div className={styles.wrapper} style={{ width: width }}>
      <div className={styles.contentWrapper}>
        <div className={styles.headerWrapper}>
          <strong>{data?.id || data?.user_id}</strong>
          {deleteFunction && data?.id && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              onClick={() => deleteFunction(data?.id)}
              style={{ cursor: "pointer" }}
            >
              <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
            </svg>
          )}
        </div>

        <div className={styles.separator} />
        <div className={styles.questionWrapper}>
          {data &&
            Object.keys(data).map((key, i) => {
              if (key === "tags") {
                return (
                  <div key={"tags" + key} className={styles.dataWrapper}>
                    <strong>{key}: </strong>
                    <div>
                      {data?.tags.map((tag, i) =>
                        i !== data?.tags.length - 1 ? tag + ", " : tag
                      )}
                    </div>
                  </div>
                );
              } else if (key !== "id") {
                return (
                  <div key={"result" + key} className={styles.dataWrapper}>
                    <strong>{key}: </strong>
                    <div>
                      {typeof data?.[key] != "string"
                        ? JSON.stringify(data?.[key])
                        : data?.[key]}
                    </div>
                  </div>
                );
              } else return null;
            })}
        </div>
      </div>
    </div>
  );
};
