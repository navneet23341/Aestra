import "./Landing.css";

import HeroText from "./components/HeroText";
import HeroImage from "./components/HeroImage";
import OutfitRow from "./components/OutfitRow";
import AuthModal from "./components/AuthModal";
import { useState ,useEffect } from "react";
import { Navigate} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import SplashScreen from "./SplashScreen";

export default function Landing(){
    const [showAuth , setShowAuth] = useState(false);
    const {user , loading } = useAuth();

    if (loading) {

        return <SplashScreen />;

    }

    if (user) {

        return <Navigate to="/home" replace />;

    }

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