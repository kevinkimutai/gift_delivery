import React from "react";
import {
  HiUserPlus,
  HiChatBubbleOvalLeftEllipsis,
  HiShoppingCart,
  HiSignal,
  HiBanknotes,
} from "react-icons/hi2";
import { motion, Variants } from "framer-motion";

const usageData = [
  {
    id: 1,
    title: "Login",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    icon: <HiUserPlus className="text-yellow-200 text-8xl mb-6 mx-auto" />,
  },
  {
    id: 2,
    title: "Chat with our ChatBot",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    icon: (
      <HiChatBubbleOvalLeftEllipsis className="text-yellow-200 text-8xl mb-6 mx-auto" />
    ),
  },
  {
    id: 3,
    title: "Order Your Gifts",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    icon: <HiShoppingCart className="text-yellow-200 text-8xl mb-6 mx-auto" />,
  },
  {
    id: 4,
    title: "Order Tracking",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    icon: <HiSignal className="text-yellow-200 text-8xl mb-6 mx-auto" />,
  },
  {
    id: 5,
    title: "Pay upon Delivery MPesa",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    icon: <HiBanknotes className="text-yellow-200 text-8xl mb-6 mx-auto" />,
  },
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

const Steps = () => {
  return (
    <div className="bg-teal-400 p-10 flex flex-col justify-center items-center">
      <motion.h1
        initial={{ opacity: 0, scale: 0, y: 100 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { ease: "easeIn", duratin: 0.5 },
        }}
        viewport={{ once: true }}
        className="font-bold text-xl text-white mb-6"
      >
        How it Works
      </motion.h1>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 mb-6 max-w-screen-lg"
      >
        {usageData.map((data) => (
          <motion.div
            variants={childVariants}
            key={data.id}
            className="flex justify-start items-start h-full"
          >
            {/* <h2 className="mr-4 font-bold text-2xl text-white">{data.id}.</h2> */}
            <div className="border-2 border-purple-200 shadow-lg p-4 flex flex-col justify-between">
              <div>
                {data.icon}
                <h2 className="font-bold text-white mb-4">{data.title}</h2>
                <p className="text-gray-600">{data.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <button className="rounded-full bg-purple-400 px-5 py-2 text-lg text-white">
        Try Now
      </button>
    </div>
  );
};

export default Steps;
