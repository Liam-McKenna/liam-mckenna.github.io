import React from "react";
import styles from "./button.module.scss";

export default function Button({ text, file }) {
  return (
    <a href="/document/liamCV.pdf" download>
      <button className="mr-2 bg-[#705DA6] hover:bg-blue-600 text-white font-bold py-1.5 px-3 rounded inline-flex items-center">
        <svg
          className="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>{text}</span>
      </button>
    </a>
  );
}
