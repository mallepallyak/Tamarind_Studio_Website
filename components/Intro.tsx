"use client";

import { useEffect } from "react";

type IntroProps = {
  onComplete: () => void;
};

export default function Intro({ onComplete }: IntroProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Intro finished");
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>Animation Placeholder</p>

      <h1 style={{ fontSize: "48px", marginTop: "16px" }}>
        Tamarind Studio
      </h1>

      <button
        onClick={onComplete}
        style={{
          marginTop: "40px",
          padding: "12px 24px",
          background: "transparent",
          color: "white",
          border: "1px solid white",
          cursor: "pointer",
        }}
      >
        Skip
      </button>
    </main>
  );
}