"use client";

import { useState } from "react";
import Intro from "@/components/Intro";
import Hero from "@/components/Hero";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <Intro onComplete={() => setShowIntro(false)} />;
  }

  return <Hero />;
}