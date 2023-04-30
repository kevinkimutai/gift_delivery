import React, { useEffect } from "react";
import { motion, Variants, useCycle, AnimatePresence } from "framer-motion";

const headerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.65,
    },
  },
};

const headerChildVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.25,
    x: -100,
  },
  show: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const childVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.25,
    y: 100,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  initial: {
    opacity: 0,
    y: 200,
    scale: 0,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.5,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const headerTexts = [
  "girlfriend",
  "best-friend",
  "brother",
  "colleague",
  "husband",
  "mother",
  "boyfriend",
  "wife",
  "sister",
  "father",
];

const Banner = () => {
  const [text, cycleText] = useCycle(...headerTexts);

  useEffect(() => {
    const interval = setInterval(() => {
      cycleText();
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div className="flex flex-col sm:flex-row w-screen h-full sm:h-screen ">
        <motion.header
          variants={headerVariants}
          initial="hidden"
          animate="show"
          className="mt-[15vh] sm:mt-2 w-full sm:w-3/5 sm:max-md:py-10 sm:max-md:pl-10 sm:max-md:pr-0 p-10 flex flex-col justify-center items-start"
        >
          <motion.h1
            variants={headerChildVariants}
            className="font-extrabold bg-gradient-to-r from-teal-500 to-purple-400 block text-transparent bg-clip-text text-5xl mb-4"
          >
            Send the Perfect Gift.
          </motion.h1>
          <motion.h2
            variants={headerChildVariants}
            className="font-bold text-xl max-w-xl text-gray-500  mb-6"
          >
            Surprise Your
            <motion.span
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="font-bold uppercase text-2xl mx-2 bg-red-700 text-white p-2 skew-y-[47deg]"
            >
              {" "}
              {text}{" "}
            </motion.span>
            with Same-Day Delivery
          </motion.h2>
          <motion.p
            variants={headerChildVariants}
            className="max-w-full md:max-w-xl text-slate-600 font-normal mb-6"
          >
            Our gift delivery app makes it easy to send thoughtful gifts for any
            occasion, whether it's for a loved one's birthday or a corporate
            gift basket to show appreciation to your business associates. With
            same-day delivery options available, you can surprise anyone with
            the perfect gift, no matter how busy your schedule may be.
          </motion.p>
          <motion.button
            variants={headerChildVariants}
            className="rounded-full bg-gradient-to-r from-teal-500 to-purple-400 px-5 py-2 text-lg text-slate-100 hover:!bg-red-700 "
          >
            Start Gifting
          </motion.button>
        </motion.header>
        <motion.div className="w-full sm:w-2/5 sm:max-md:py-10 sm:max-md:pr-10 sm:max-md:pl-5 p-10 flex justify-center items-center ">
          <motion.div
            className="grid grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div
              className="row-span-3 col-span-2 border-2 border-red-800"
              variants={childVariants}
            >
              <img
                src="bouquet-1.png"
                alt="ima"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <motion.div
              className="row-span-1 col-span-1 flex justify-center items-center border-2 border-red-800"
              variants={childVariants}
            >
              <img
                src="cherries.png"
                alt="ima"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <motion.div
              className="col-span-1 row-span-2 h-full flex justify-center items-center border-2 border-red-800"
              variants={childVariants}
            >
              <img
                src="hero-img.png"
                alt="ima"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <motion.div
              className="col-span-1 flex justify-center items-center border-2 border-red-800"
              variants={childVariants}
            >
              <img
                src="cherries.png"
                alt="ima"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <motion.div
              className="col-span-2 flex justify-center items-center border-2 border-red-800"
              variants={childVariants}
            >
              <img
                src="banner-img.png"
                alt="ima"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Banner;
