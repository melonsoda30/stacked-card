"use client";
import { Card } from "@/components/card";
import { Shuffle, SkipForward } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [colors, setColors] = useState([
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
  ]);
  const [reset, setReset] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [direction, setDirection] = useState<
    "prev" | "next" | "shuffle" | null
  >(null);

  const handleNext = () => {
    setActiveCard((prev) => prev + 1);
    setDirection("next");

    if (activeCard === colors.length - 1) {
      setTimeout(() => {
        setDirection(null);
        setActiveCard(0);
        setReset((prev) => prev + 1);
      }, 1000);
    }
  };

  const handlePrev = () => {
    setActiveCard((prev) => prev - 1);
    setDirection("prev");
  };

  const handleShuffle = () => {
    setDirection("shuffle");
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
    setTimeout(() => {
      setColors(shuffledColors);
      setDirection(null);
      setActiveCard(0);
      setReset((prev) => prev + 1);
    }, 1000);
  };

  const handleReset = () => {
    setReset((prev) => prev + 1);
  };

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
          activeCard={activeCard}
          direction={direction}
          setActiveCard={setActiveCard}
          setDirection={setDirection}
          cardLength={colors.length}
        />
      ))}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-row gap-10">
        <button onClick={handlePrev} disabled={activeCard === 0}>
          <SkipForward className="rotate-180" />
        </button>
        <button onClick={handleNext} disabled={activeCard === colors.length}>
          <SkipForward />
        </button>
        <button onClick={handleShuffle} disabled={activeCard === colors.length}>
          <Shuffle />
        </button>
      </div>
    </div>
  );
}
