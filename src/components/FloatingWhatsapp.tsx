"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import whatsapp from "@/assets/whatsapp.png";
import instagram from "@/assets/instagram.png";
import { instagramUrl, phoneNumber } from "@/config";

// Reusable floating button component
const FloatingButton = ({
  href,
  image,
  alt,
  label,
  bgClass,
  style,
}: {
  href: string;
  image: any;
  alt: string;
  label: string;
  bgClass: string;
  style?: React.CSSProperties;
}) => (
  <div className="w-full flex justify-end" style={style}>
    <Link
      href={href}
      className="overflow-hidden flex rounded-full relative"
      target="_blank"
    >
      <motion.div
        initial={{ translateX: "100%" }}
        animate={{ translateX: ["100%", "0%", "0%", "100%", "100%"] }}
        transition={{
          times: [0, 0.1875, 0.3125, 0.375, 1], // 0s, 1.5s, 2.5s, 3s, 8s
          duration: 8, // total cycle: 8s
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className={`h-full flex items-center justify-center right-10 p-2 pl-4 rounded-l-full pr-12 ${bgClass}`}
      >
        <p className="text-nowrap text-center text-white font-semibold">
          {label}
        </p>
      </motion.div>
      <Image
        src={image}
        width={50}
        height={50}
        className="w-10 h-10 z-20 absolute right-0"
        alt={alt}
      />
    </Link>
  </div>
);

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-0 right-0 m-4 z-50 flex flex-col gap-2 items-end">
      <FloatingButton
        href={instagramUrl}
        image={instagram}
        alt="Instagram"
        label="Follow us"
        bgClass="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600"
        style={{ marginBottom: 12 }}
      />
      <FloatingButton
        href={phoneNumber}
        image={whatsapp}
        alt="WhatsApp"
        label="Contact now"
        bgClass="bg-green-500"
      />
    </div>
  );
};

export default FloatingButtons;
