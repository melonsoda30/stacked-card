"use client";
import { useMotionValue, animate, useTransform } from "motion/react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Direction = "prev" | "next" | "shuffle" | null;

interface CardProps {
  bgColor: string;
  isLast: boolean;
  handleReset: () => void;
  resetCount: number;
  index: number;
  activeCard: number;
  direction: Direction;
  setActiveCard: React.Dispatch<React.SetStateAction<number>>;
  setDirection: React.Dispatch<React.SetStateAction<Direction>>;
}

export function Card({
  bgColor,
  isLast,
  handleReset,
  resetCount,
  index,
  activeCard,
  direction,
  setActiveCard,
  setDirection,
}: CardProps) {
  const [isActive, setIsActive] = useState(false);
  const x = useMotionValue(0);
  const rangeDeg = useMemo(() => {
    const deg = [-10, 10];
    return Math.random() * (deg[1] - deg[0]) + deg[0];
  }, []);

  const rotate = useTransform(
    x,
    [-200, 0, 200],
    [rangeDeg - 5, rangeDeg, rangeDeg + 5]
  );
  // const offset = index - activeCard;

  useEffect(() => {
    if (direction === "shuffle" && index >= activeCard) {
      animate(x, 1000, {
        type: "spring",
        stiffness: 400,
        damping: 30,
        delay: index * 0.1,
      });
    }
    if (index === activeCard - 1 && direction === "next") {
      animate(x, 1000, {
        type: "spring",
        stiffness: 400,
        damping: 30,
      });
    }

    if (index === activeCard && direction === "prev") {
      animate(x, 0, {
        type: "spring",
        stiffness: 400,
        damping: 30,
      });
    }
  }, [activeCard, direction, index, x]);

  useEffect(() => {
    if (resetCount > 0) {
      animate(x, 0, {
        type: "spring",
        stiffness: 400,
        damping: 30,
        delay: index * 0.1,
      });
    }
  }, [resetCount, x, index]);

  function handleDragEnd() {
    const currentX = x.get();
    const screenWidth = window.innerWidth;

    setIsActive(false);

    if (currentX >= -100 && currentX <= 100) {
      animate(x, 0, {
        type: "spring",
        stiffness: 400,
        damping: 30,
      });
    }

    if (currentX < -100) {
      setDirection(null);
      setActiveCard(index + 1);
      animate(x, -screenWidth - 500, {
        type: "spring",
        stiffness: 400,
        damping: 30,
      }).then(() => {
        if (isLast) setTimeout(handleReset, 100);
      });
    }

    if (currentX > 100) {
      setDirection(null);
      setActiveCard(index + 1);
      animate(x, screenWidth + 500, {
        type: "spring",
        stiffness: 400,
        damping: 30,
      }).then(() => {
        if (isLast) setTimeout(handleReset, 100);
      });
    }
  }

  return (
    <motion.div
      onPointerDown={() => setIsActive(true)}
      onPointerUp={() => setIsActive(false)}
      onPointerCancel={() => setIsActive(false)}
      onDragStart={() => setIsActive(true)}
      onDragEnd={handleDragEnd}
      className="w-[250px] h-[250px] md:w-[430px] md:h-[430px] absolute left-1/2 -translate-x-1/2 hover:cursor-grab active:cursor-grabbing"
      style={{
        backgroundColor: bgColor,
        x,
        zIndex: 100 - index,
        // rotate,
      }}
      animate={{
        scale: isActive ? 1.2 : 1,
        rotate: isActive ? 0 : rotate.get(),
      }}
      drag="x"
    />
  );
}
