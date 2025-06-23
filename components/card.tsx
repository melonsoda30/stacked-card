"use client";
import { useMotionValue, animate, useTransform } from "motion/react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export function Card({
  bgColor,
  isLast,
  handleReset,
  resetCount,
  index,
}: {
  bgColor: string;
  isLast: boolean;
  handleReset: () => void;
  resetCount: number;
  index: number;
}) {
  const [isActive, setIsActive] = useState(false);
  const x = useMotionValue(0);
  // const offset = index - activeCard;

  const rangeDeg = useMemo(() => {
    const deg = [-10, 10];
    return Math.random() * (deg[1] - deg[0]) + deg[0];
  }, []);

  const rotate = useTransform(
    x,
    [-200, 0, 200],
    [rangeDeg - 5, rangeDeg, rangeDeg + 5]
  );

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
      animate(x, -screenWidth - 500, {
        type: "spring",
        stiffness: 400,
        damping: 30,
      }).then(() => {
        if (isLast) setTimeout(handleReset, 100);
      });
    }

    if (currentX > 100) {
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
      className="w-[430px] h-[430px] absolute right-30 hover:cursor-grab active:cursor-grabbing"
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
