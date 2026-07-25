import { useState } from "react";
import "./HeroText.css";

export default function HeroText({openAuth}) {


  return (
    <div className="hero-text">

      <h1>MIRROR</h1>

      <p>
        Discover outfits that actually match your personality.
        Upload your photo and let AI become your personal stylist.
      </p>

      <button onClick={openAuth}>Try Mirror</button>

    </div>
  );
}