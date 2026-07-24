import hero from "../assets/model.png";
import "./HeroImage.css";

export default function HeroImage(){

    return(

        <div className="hero-image-container">

            <span className="sparkle s1">✦</span>
            <span className="sparkle s2">✦</span>
            <span className="sparkle s3">✦</span>
            <span className="sparkle s4">✦</span>

            <img
                src={hero}
                alt=""
                className="hero-image"
            />

            <div className="hero-shadow"></div>
        </div>

    )

}