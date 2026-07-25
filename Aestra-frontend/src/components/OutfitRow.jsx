import { motion } from "motion/react";
import OutfitCard from "./OutfitCard";
import "./OutfitRow.css";
import temp from "../assets/temp.jpg";

const outfits = [
  temp, temp, temp, temp,
  temp, temp, temp, temp,
];

export default function OutfitRow({ direction }) {

  const loop = [...outfits, ...outfits, ...outfits, ...outfits];

  return (

    <div className={`slider ${direction}`}>

      <motion.div
        className="track"

        animate={{
          x: direction === "left"
            ? ["0%", "-50%"]
            : ["-50%", "0%"],
        }}

        transition={{
          duration: 25,
          ease: "linear",
          repeat: Infinity,
        }}
      >

        {loop.map((img, i) => (

          <OutfitCard
            key={i}
            image={img}
          />

        ))}

      </motion.div>

    </div>

  );
}