import React, { useEffect } from "react";
import { motion, AnimatePresence, Variants, useCycle } from "framer-motion";

const texts = [
  "SALE SALE SALE ",
  "20% DISCOUNT ",
  "UPTO JUNE 3RD ",
  "GRAB IT WHILE STOCKS LAST ",
];
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const textVariants = {
  initial: {
    opacity: 0,
    x: 1200,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -150,
    scale: 0.5,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const PromoMsg = () => {
  const [text, cycleText] = useCycle(...texts);

  useEffect(() => {
    const interval = setInterval(() => {
      cycleText();
    }, 3500);

    return () => clearInterval(interval);
  }, []);
  return (
    <AnimatePresence mode="popLayout">
      <motion.ul className="flex justify-center items-center bg-red-700">
        <motion.span
          key={text}
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="font-bold uppercase text-2xl mx-2 bg-red-700 text-white p-2 skew-y-[47deg]"
        >
          {text}
        </motion.span>
      </motion.ul>
    </AnimatePresence>
  );
};

export default PromoMsg;
