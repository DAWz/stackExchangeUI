import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./NavigationBar.module.css";

export const NavigationBar = () => {
  const routes = [
    { name: "Home", route: "/" },
    { name: "Questions", route: "/questions" },
    { name: "Users", route: "/users" },
    { name: "About", route: "/about" },
  ];
  const location = useLocation();

  const naviagte = useNavigate();
  return (
    <div className={styles.wrapper}>
      <strong>Stack Overflow Dashboard</strong>
      <div className={styles.separator} />
      {routes.map((route, i) => (
        <div
          key={route.name}
          className={styles.option}
          style={
            location.pathname === route.route ? { color: "#4b4c4f" } : null
          }
          onClick={() => naviagte(route.route)}
        >
          {route.name}
        </div>
      ))}
    </div>
  );
};
