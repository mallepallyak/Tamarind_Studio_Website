"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function SignupPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Unable to connect. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "48px" }}>You're in.</h1>

          <p style={{ marginTop: "16px", color: "#666" }}>
            Thanks for joining Tamarind Studio.
          </p>

          <Link
            href="/"
            style={{
              display: "inline-block",
              marginTop: "32px",
              color: "black",
            }}
          >
            Return home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "420px",
        }}
      >
        <p
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            fontSize: "14px",
          }}
        >
          Tamarind Studio
        </p>

        <h1 style={{ fontSize: "42px", marginTop: "12px" }}>
          Join the list
        </h1>

        <p style={{ marginTop: "12px", color: "#666" }}>
          Be the first to hear what's coming.
        </p>

        <div style={{ marginTop: "32px" }}>
          <label htmlFor="name">Name</label>

          <input
            id="name"
            name="name"
            required
            maxLength={120}
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              border: "1px solid #aaa",
            }}
          />
        </div>

        <div style={{ marginTop: "24px" }}>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={320}
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              border: "1px solid #aaa",
            }}
          />
        </div>

        {status === "error" && (
          <p
            role="alert"
            style={{
              marginTop: "20px",
              color: "red",
            }}
          >
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            width: "100%",
            marginTop: "32px",
            padding: "14px",
            background: "black",
            color: "white",
            border: "none",
            cursor: status === "loading" ? "not-allowed" : "pointer",
            opacity: status === "loading" ? 0.6 : 1,
          }}
        >
          {status === "loading" ? "Joining..." : "Join →"}
        </button>
      </form>
    </main>
  );
}