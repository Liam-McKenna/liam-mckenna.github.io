"use client";

import React, { useState } from "react";
import styles from "./card.module.scss";

export default function Card({ content, index, onClick, isOpen }) {
  // const [open, setOpen] = useState(false);
  function BoldText({ text }) {
    return <span className={styles.bold}>{text}</span>;
  }

  function makeNumbersBold(text) {
    const parts = text.split(/(\d+)/);
    return parts.map((part, index) =>
      /\d+/.test(part) ? <BoldText key={index} text={part} /> : part
    );
  }

  const Overlay = () => {
    return (
      <div className="absolute p-4 drop-shadow-2xl bg-[#705DA6] w-full h-full rounded-lg top-[105%] z-10 ">
        {content.description}
      </div>
    );
  };

  return (
    <div className={styles.card} onClick={() => onClick(index)}>
      <div className="flex flex-col justify-center h-full p-4 leading-6 ">
        <div className={styles.company}>{content.company}</div>
        <div className={styles.title}>{content.title}</div>
        <div className={styles.employment}>{makeNumbersBold(content.time)}</div>
      </div>
      <div className=" absolute bottom-0 right-0 pr-4 pb-3">
        <svg
          width="67"
          height="56"
          viewBox="0 0 67 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_27_39)">
            <path
              opacity="0.2"
              d="M4 27.8954C4 26.3307 4.92968 24.9156 6.36575 24.2944L37.063 11.0153C49.0973 5.80939 62.5268 14.6321 62.5268 27.7442C62.5268 40.7912 49.2195 49.6131 37.2023 44.5327L6.39573 31.5092C4.94363 30.8953 4 29.4719 4 27.8954Z"
              fill="#705DA6"
            />
            <path
              opacity="0.2"
              d="M10.576 27.8942C10.576 26.3179 11.4751 24.8796 12.8921 24.1891L37.575 12.1601C49.1003 6.54328 62.5268 14.936 62.5268 27.7572C62.5268 40.5105 49.2296 48.9058 37.7155 43.422L12.9254 31.6153C11.4902 30.9318 10.576 29.4838 10.576 27.8942Z"
              fill="#705DA6"
            />
            <path
              d="M21.7554 27.9927C21.7554 26.5062 22.5473 25.1323 23.8336 24.3872L40.1047 14.9616C50.0618 9.19361 62.5268 16.3783 62.5268 27.8853C62.5268 39.3266 50.1897 46.5192 40.2332 40.8827L23.8694 31.6188C22.563 30.8792 21.7554 29.494 21.7554 27.9927Z"
              fill="#705DA6"
            />
            <path
              d="M53.818 28.1619L47.242 35.5599C46.9422 35.9 46.4236 35.9331 46.083 35.6339C45.7429 35.3341 45.7098 34.8155 46.009 34.4749L52.1 27.6194L46.009 20.7638C45.7329 20.4211 45.7758 19.9218 46.1061 19.6311C46.4365 19.3404 46.9372 19.3614 47.242 19.6788L53.818 27.0768C54.0906 27.3871 54.0906 27.8516 53.818 28.1619Z"
              fill="#FDF6E6"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_27_39"
              x="0"
              y="9.49724"
              width="66.5269"
              height="44.4934"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_27_39"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_27_39"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <div className=" absolute top-0 right-0 pr-4 pt-3  text-[#705DA6]">
        {index}
      </div>

      {isOpen && <Overlay />}
    </div>
  );
}
