import { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.jpg";
import { logout } from "../api/auth";
export default function Header(){

    const [open,setOpen]=useState(false);
    const navigate = useNavigate();

    const logoutuser = async ()=>{
        const refreshToken = localStorage.getItem("refreshToken");

        await logout(refreshToken);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        navigate("/");
    }

    return(

        <header className="header">

            <div className="header-left">

                <img
                    src={logo}
                    alt="Mirror"
                    className="logo"
                />

                <button className="nav-btn">

                    About

                </button>

            </div>

            <div className="header-right">

                <button

                    className="menu-btn"

                    onClick={()=>setOpen(!open)}

                >

                    ⋮

                </button>

                {

                    open &&

                    <div className="dropdown">

                        <button onClick={logoutuser}>

                            👤 Profile

                        </button>

                        <button>

                            🕘 History

                        </button>

                    </div>

                }

            </div>

        </header>

    );

}