import React from "react";
import { motion } from "framer-motion";

const Modal = ({ selectedImage, closeModal }) => {
  return (
    <motion.div
      onClick={closeModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      //   onClick={handleClick}
      className="fixed z-50 top-0 left-0 w-full h-full pt-[5rem] bg-black/60"
    >
      <motion.img
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        className="block max-w-[60%] max-h-[80%] my-[60px] mx-auto rounded-md shadow-md border-[3px] border-white"
        src={selectedImage}
      />
    </motion.div>
  );
};

export default Modal;
