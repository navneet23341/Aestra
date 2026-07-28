import { useState } from "react";
import "./Header.css";

import logo from "../assets/logo.jpg";

export default function Header(){

    const [open,setOpen]=useState(false);

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

                        <button>

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