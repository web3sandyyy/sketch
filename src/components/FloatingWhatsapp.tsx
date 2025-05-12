"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import whatsapp from "@/assets/whatsapp.png";

const FloatingWhatsapp = () => {
  return (
    <div className="fixed bottom-0 right-0 m-4 z-50  rounded-full">
      <Link
        href="https://wa.me/9152345333"
        className="overflow-hidden flex rounded-full relative "
        target="_blank"
      >
        <motion.div
          initial={{ translateX: "100%" }}
          animate={{ translateX: 0 }}
          exit={{ translateX: "100%" }}
          transition={{
            duration: 3,
            delay: 0.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className=" h-full flex items-center justify-center right-10 p-2 pl-4 rounded-l-full  bg-green-500 pr-12"
        >
          <p className="text-nowrap text-center text-white font-semibold">
            Contact now
          </p>
        </motion.div>

        <Image
          src={whatsapp}
          width={50}
          height={50}
          className="w-10 h-10  z-20  absolute right-0"
          alt="WhatsApp"
        />
      </Link>
    </div>
  );
};

export default FloatingWhatsapp;
