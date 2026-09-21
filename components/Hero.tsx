import Link from "next/link";

export default function Hero() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#eeeeee",
        color: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "24px",
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

      <h1
        style={{
          fontSize: "56px",
          maxWidth: "800px",
          marginTop: "20px",
        }}
      >
        Brand experience placeholder
      </h1>

      <p
        style={{
          maxWidth: "550px",
          marginTop: "20px",
          color: "#666",
          lineHeight: 1.6,
        }}
      >
        This is where the final artwork, campaign visuals, headline,
        and brand experience will eventually live.
      </p>

      <Link
        href="/signup"
        style={{
          marginTop: "36px",
          padding: "14px 28px",
          border: "1px solid black",
          color: "black",
          textDecoration: "none",
        }}
      >
        Join the List →
      </Link>
    </main>
  );
}