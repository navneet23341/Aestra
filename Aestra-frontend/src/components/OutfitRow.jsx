import { useEffect, useRef } from "react";
import "./OutfitRow.css";
import OutfitCard from "./OutfitCard";
import temp from "../assets/temp.jpg";

const outfits = [
  temp, temp, temp, temp,
  temp, temp, temp, temp
];

export default function OutfitRow({ direction }) {

  const marqueeRef = useRef(null);

  useEffect(() => {

    const marquee = marqueeRef.current;

    let position = 0;

    const speed = 0.6;

    const trackWidth = marquee.scrollWidth / 2;

    function animate() {

      if (direction === "left") {

        position -= speed;

        if (Math.abs(position) >= trackWidth)
          position = 0;

      } else {

        position += speed;

        if (position >= 0)
          position = -trackWidth;

      }

      marquee.style.transform = `translateX(${position}px)`;

      requestAnimationFrame(animate);
    }

    const id = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(id);

  }, [direction]);

  return (

    <div className={`slider ${direction}`}>

      <div className="marquee" ref={marqueeRef}>

        {[...outfits, ...outfits].map((img, i) => (

          <OutfitCard
            key={i}
            image={img}
          />

        ))}

      </div>

    </div>

  );

}