import "./Landing.css";

import HeroText from "./components/HeroText";
import HeroImage from "./components/HeroImage";
import OutfitRow from "./components/OutfitRow";
import AuthModal from "./components/AuthModal";
import { useState } from "react";

export default function Landing(){
    const [showAuth , setShowAuth] = useState(false);

    return(

        <div className="landing">

            <HeroText openAuth={()=>setShowAuth(true)}/>

            <OutfitRow direction="left"/>

            <HeroImage/>

            {showAuth && (
                <AuthModal
                    closeAuth={() => setShowAuth(false)}
                />
            )}
                    

        </div>

    )

}