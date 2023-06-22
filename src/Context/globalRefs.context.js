"use client";
import { createContext, useContext, useRef } from "react";

const GlobalRefsContext = createContext();

export function GlobalRefsProvider({ children }) {
  const refs = {
    aboutRef: useRef(null),
    skillsRef: useRef(null),
    experienceRef: useRef(null),
    educationRef: useRef(null),
  };

  return (
    <GlobalRefsContext.Provider value={{ refs }}>
      {children}
    </GlobalRefsContext.Provider>
  );
}

export function useGlobalRefsContext() {
  return useContext(GlobalRefsContext);
}
