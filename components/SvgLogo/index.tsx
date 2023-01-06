import React from "react";
import { motion } from "framer-motion";

export default function SvgLogo() {
  const svgVariants = {
    start: {
      opacity: 0,
      pathLength: 0,
    },

    finished: {
      opacity: 1,
      pathLength: 1,
      transition: {
        delay: 0.9,
        duration: 4,
        ease: "easeIn",
      },
    },
  };

  //   const bounceTransition = {
  //     x: {
  //       duration: 5,
  //       yoyo: Infinity,
  //       ease: "easeIn",
  //     },
  //   };

  return (
    <div>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        color="#0E49B5"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <motion.path
          fill="currentColor"
          stroke="none"
          fill-opacity="0"
          d="M0 0h24v24H0z"
        />
        <motion.circle
          variants={svgVariants}
          initial="start"
          animate="finished"
          //   transition={bounceTransition}
          //   animate={{
          //     y: ["0em", "12.8em"],
          //   }}
          cx="6"
          cy="16"
          r="3"
        />
        <motion.circle
          variants={svgVariants}
          initial="start"
          animate="finished"
          cx="16"
          cy="19"
          r="2"
        />
        <motion.circle
          variants={svgVariants}
          initial="start"
          animate="finished"
          cx="14.5"
          cy="7.5"
          r="4.5"
        />
      </motion.svg>
    </div>
  );
}
