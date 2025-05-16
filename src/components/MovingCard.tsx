import React from "react";
import Image from "next/image";
import img1 from "@/assets/childrensDrawing/1.png";
import img2 from "@/assets/childrensDrawing/2.jpeg";
import img3 from "@/assets/childrensDrawing/3.jpeg";

const MovingCard = () => {
  const imgClass = "rounded-lg max-w-[300px] w-full aspect-square  object-scale-down object-center";
  return (
    <div className="w-fit mx-auto grid grid-cols-3 mb-10 md:mb-0">
      <Image
        src={img2}
        alt="img2"
        width={300}
        height={300}
        priority
        className={`${imgClass}  -rotate-30 `}
      />
      <Image
        src={img1}
        alt="img1"
        width={300}
        height={300}
        priority
        className={`${imgClass} -mt-[30%] relative z-10`}
      />
      <Image
        src={img3}
        alt="img3"
        width={300}
        height={300}
        priority
        className={`${imgClass} rotate-30`}
      />
    </div>
  );
};

export default MovingCard;