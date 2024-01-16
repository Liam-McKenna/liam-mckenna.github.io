"use client";
import React, { useRef } from "react";
import styles from "./introduction.module.scss";

export default function Introduction() {
  const introRef = useRef(null);

  return (
    <div id="intro" ref={introRef}>
      <div className={styles.container}>
        <div className={styles.titleText}>
          {`SOFTWARE ENGINEER, FRONTEND & WEB APP DEVELOPER`}
        </div>
        <h1 className={styles.nameText}>LIAM MCKENNA</h1>
        <a href="/documents/liamCV.pdf" download="Liams CV">
          <h3 className={styles.downloadResume}>{`Download Resume`}</h3>
        </a>
        <div className={styles.mouseScroll}></div>
      </div>
    </div>
  );
}
