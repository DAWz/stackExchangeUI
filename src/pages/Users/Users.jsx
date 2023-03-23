import React, { useState } from "react";
import { Search } from "../../components/SearchBar/SearchBar";
import styles from "./Users.module.css";
import { useGetUserByIDQuery } from "../../services/users";
import Spinner from "../../components/Spinner/Spinner";
import { NoResult } from "../../components/NoResult/NoResult";
import { Result } from "../../components/Result/Result";

export const Users = () => {
  const [ID, setID] = useState("");
  const { data: user, isLoading } = useGetUserByIDQuery(ID, {
    skip: ID === "",
  });

  return (
    <div className={styles.wrapper}>
      <strong>Users Dashboard</strong>
      <div className={styles.separator} />
      <div className={styles.searchBar}>
        <Search onChange={setID} type={"ID"} />
      </div>
      <div className={styles.usersWrapper}>
        {ID === "" && (
          <div className={styles.initialResults}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-list-search"
              width="300"
              height="300"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="15" cy="15" r="4" /> <path d="M18.5 18.5l2.5 2.5" />
              <path d="M4 6h16" /> <path d="M4 12h4" /> <path d="M4 18h4" />
            </svg>
            <div>Search for a user using a user ID!</div>
          </div>
        )}
        {isLoading && (
          <div className={styles.empty}>
            <Spinner />
          </div>
        )}
        {ID !== "" && user && !isLoading && <Result data={user} key={"User"} />}
        {!isLoading && ID !== "" && !user && (
          <div className={styles.empty}>
            <NoResult type="User" />
          </div>
        )}
      </div>
    </div>
  );
};
