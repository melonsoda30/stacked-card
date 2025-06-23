"use client";
import { Card } from "@/components/card";
import { useState } from "react";

export default function Home() {
  const [reset, setReset] = useState(0);

  function handleReset() {
    setReset((prev) => prev + 1);
  }
  const colors = [
    "#0fa188",
    "#335981",
    "#b433d5",
    "#6db4f2",
    "#f1175a",
    "#6fc4aa",
    "#6d06e5",
    "#aa3184",
    "#757333",
    "#44863f",
  ];
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-600 flex flex-col items-center justify-center">
      {colors.map((bg, i) => (
        <Card
          key={i}
          bgColor={bg}
          isLast={i === colors.length - 1}
          handleReset={handleReset}
          resetCount={reset}
          index={i}
        />
      ))}
    </div>
  );
}
