import "./Landing.css";

import HeroText from "./components/HeroText";
import HeroImage from "./components/HeroImage";
import OutfitRow from "./components/OutfitRow";

export default function Landing(){

    return(

        <div className="landing">
            
            <HeroText/>

            <OutfitRow direction="left"/>

            <HeroImage/>

        </div>

    )

}