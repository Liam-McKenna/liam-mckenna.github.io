"use client";
import React, { useRef } from "react";
import styles from "./introduction.module.scss";

//components
import Button from "../../components/button/Button";

export default function Introduction() {
  const introRef = useRef(null);

  return (
    <div id="intro" ref={introRef}>
      <div className={styles.container}>
        <div className="flex flex-col text-center w-100">
          <h1>Liam McKenna</h1>
          <h3
            className={styles.componentHighlight}
          >{`< Software Engineer />`}</h3>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#1C1B32] p-6 rounded-lg w-1/2">
            My journey as a Software Engineer began from my beginnings in
            graphic design, to now where Ive embraced the complexities of
            bioinformatics and proteomics data management over the past two
            years.
            <br />
            <br /> My daily work involves developing and maintaining an internal
            data warehouse and user interface, collaborating with data
            scientists, and fine-tuning UI/UX designs.
            <br />
            <br />I balance my full-time role with my ongoing studies in System
            Information & Information Technology at DIT Dublin. I am driven by
            the ambition to strengthen my practical knowledge in Software Design
            and Computer Science, striving to make my mark in the technology
            industry.
          </div>
          <div className="bg-[#1C1B32] p-6 rounded-lg w-1/2">
            <h2 className="text-white text-xl font-bold mb-3">
              📞 Contact Information:
            </h2>
            <ul className="text-white">
              <li className="mb-2">📱 Phone: 083 444 8785</li>
              <li className="mb-2">📧 Email: liam.mckenna@outlook.ie</li>
              <li className="mb-2">🏠 Address: North-East Wicklow</li>
              <li className="mb-2">
                💼 LinkedIn:{" "}
                <a
                  href="https://linkedin.com/in/liammckennafullspec"
                  className="text-blue-400 underline"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
            <Button text={"Word"} />
            <Button text={"PDF"} />
          </div>
        </div>
      </div>
    </div>
  );
}
