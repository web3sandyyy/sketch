"use client";
import Image, { StaticImageData } from "next/image";
import { RefreshCw } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function FlippableImage({
  sketch,
  original,
  index,
  totalImages = 6,
  flipDuration = 3000,
}: {
  sketch: string | StaticImageData;
  original: string | StaticImageData;
  index: number;
  totalImages?: number;
  flipDuration?: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const startTimeRef = useRef(Date.now());
  const lastIndexRef = useRef(-1);
  const manuallyFlippedRef = useRef(false);

  const handleManualFlip = () => {
    setFlipped(true);
    manuallyFlippedRef.current = true;
  };

  useEffect(() => {
    const totalCycleTime = totalImages * flipDuration;

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTimeRef.current;
      const cyclePosition = (elapsedTime % totalCycleTime) / flipDuration;
      const currentIndex = Math.floor(cyclePosition);

      if (currentIndex !== lastIndexRef.current) {
        setCurrentIndex(currentIndex);
        if (currentIndex === index) {
          if (manuallyFlippedRef.current) {
            setFlipped(false);
            manuallyFlippedRef.current = false;
          } else {
            setFlipped(true);
          }
        } else if (currentIndex === (index + 1) % totalImages) {
          setFlipped(false);
        }
        lastIndexRef.current = currentIndex;
      }
    }, 100);

    return () => clearInterval(interval);
  }, [index, totalImages, flipDuration]);

  return (
    <div className="relative aspect-square w-full h-full cursor-pointer group">
      <div className="relative w-full h-full" style={{ perspective: "1000px" }}>
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{
            transformStyle: "preserve-3d",
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Front of card */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <Image
              src={sketch}
              alt="sketch"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
          {/* Back of card */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <Image
              src={original}
              alt="original"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
        </motion.div>
      </div>
      <div
        className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow cursor-pointer hover:bg-white/90"
        onClick={handleManualFlip}
      >
        <RefreshCw
          size={16}
          className={`${currentIndex === index ? "rotate-360 duration-3000 ease-in-out transition-transform" : ""}`}
        />
      </div>
    </div>
  );
}
