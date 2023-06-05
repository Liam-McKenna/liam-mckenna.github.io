import React from "react";
import styles from "./card.module.scss";

export default function Card({ content }) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{content.title}</div>
      <div className={styles.company}>{content.location}</div>
      <div className={styles.employment}>{content.time}</div>
      <div className={styles.description}>{content.description}</div>
    </div>
  );
}
