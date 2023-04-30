import React from "react";
import { FiUser, FiGrid, FiShoppingBag, FiWatch } from "react-icons/fi";
import { motion, Variants } from "framer-motion";

const appServices = [
  {
    id: 1,
    title: "Personal Gift Delivery",
    desc: "Use the app to send personalized gifts to your loved ones for special occasions like birthdays, weddings, and anniversaries.",
    icon: <FiUser className="font-bold text-purple-300 text-[8rem] mr-3" />,
    src: "personal-gift.jpg",
  },
  {
    id: 2,
    title: "Corporate Gift Delivery",
    desc: "Companies can use the app to send gifts to their clients, partners, and employees for holidays, events, and recognition.",
    icon: <FiGrid className="font-bold text-purple-300 text-[8rem] mr-3" />,
    src: "corporate-gifting.jpg",
  },
  {
    id: 3,
    title: "Customized Gift Baskets",
    desc: "Use the app to create customized gift baskets with multiple items for a more unique and personalized gift.",
    icon: (
      <FiShoppingBag className="font-bold text-purple-300 text-[8rem] mr-3" />
    ),
    src: "gift_basket.jpg",
  },
  {
    id: 4,
    title: "Last Minute Delivery",
    desc: "Use app for last-minute gift delivery, with same-day or next-day delivery options available.",
    icon: <FiWatch className="font-bold text-purple-300 text-[8rem] mr-3" />,
    src: "stopwatch.jpg",
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

const Services = () => {
  return (
    <section className="flex flex-col justify-center items-center mb-8 p-10">
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeIn",
          },
        }}
        viewport={{ once: true }}
        className="font-bold text-xl text-gray-500 mb-6"
      >
        We Source and Deliver The Perfect Gift
      </motion.h1>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-1 max-w-screen-xl bg-gradient-to-r from-teal-500 to-purple-400 shadow-xl mb-8"
      >
        {appServices.map((service) => (
          <motion.div
            variants={childVariants}
            key={service.id}
            className="flex justify-start items-start p-4 h-full"
          >
            <div className="border-2 border-purple-400 shadow-lg flex flex-col justify-between h-full max-w-[15rem] min-w-[10rem]">
              <div>
                <img src={service.src} alt="vector" className="mb-4" />
                <h2 className="font-bold text-yellow-200  px-4">
                  {service.title}
                </h2>
              </div>
              <p className="text-gray-100 px-4 pb-4">{service.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <button className="rounded-full bg-teal-500 px-5 py-2 text-lg text-slate-100">
        Try Now
      </button>
    </section>
  );
};

export default Services;
