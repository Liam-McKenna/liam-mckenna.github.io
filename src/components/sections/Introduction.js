"use client";
import React, { useRef } from "react";
import styles from "./introduction.module.scss";

export default function Introduction() {
  const introRef = useRef(null);

  return (
    <div id="intro" ref={introRef}>
      <div className={styles.container}>
        <div className={styles.downloadText}>

          <a href="/documents/liamCV.pdf" download="Liams CV" className=" inline-block text-lg group">

            <span className="relative z-0 block px-5 py-3 overflow-hidden font-medium leading-tight text.white transition-colors duration-300 ease-out border-2 border-[#740CDC] rounded-lg 
          text-[#CBACFF] group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3  bg-[#0a0b16]"></span>
              <span className="absolute left-0 w-60 h-60 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-[#740CDC] group-hover:-rotate-180 ease"></span>
              <span className="relative z-0 downloadText">Download Resume</span>
            </span>
          </a>
        </div>

        <h1 className={styles.nameText}>LIAM MCKENNA</h1>
        <div className={styles.titleText}>
          {`SOFTWARE ENGINEER, FRONTEND & WEB APP DEVELOPER`}
        </div>

        <div className={styles.mouseScroll}></div>
      </div>
    </div>
  );
}
