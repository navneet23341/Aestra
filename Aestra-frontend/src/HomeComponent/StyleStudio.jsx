import { useState } from "react";
import "./StyleStudio.css";

export default function StyleStudio() {

    const [occasion, setOccasion] = useState("");
    const [weather, setWeather] = useState("");
    const [budget, setBudget] = useState(3000);
    const [prompt, setPrompt] = useState("");

    return(

        <div className="studio">
            <div className="studio-header">
                <h2>Style Studio</h2>

                <p>
                    Tell Mirror where you're going and what vibe you want.
                </p>
            </div>

            <div className="section">

                <h4>Occasion</h4>

                <div className="chips">

                    {[
                        "☕ Cafe",
                        "🎬 Movie",
                        "💼 Office",
                        "🎉 Party",
                        "✈ Travel",
                        "💍 Wedding"
                    ].map(item=>(

                        <button

                            key={item}

                            className={
                                occasion===item
                                ? "active"
                                : ""
                            }

                            onClick={()=>setOccasion(item)}

                        >

                            {item}

                        </button>

                    ))}

                </div>

            </div>

            <div className="section">

                <h4>Weather</h4>

                <div className="chips">

                    {[
                        "☀ Sunny",
                        "🌧 Rain",
                        "❄ Cold"
                    ].map(item=>(

                        <button

                            key={item}

                            className={
                                weather===item
                                ? "active"
                                : ""
                            }

                            onClick={()=>setWeather(item)}

                        >

                            {item}

                        </button>

                    ))}

                </div>

            </div>

            <div className="section">

                <h4>

                    Budget

                    <span>

                        ₹{budget}

                    </span>

                </h4>

                <input

                    type="range"

                    min="500"

                    max="10000"

                    step="500"

                    value={budget}

                    onChange={(e)=>setBudget(e.target.value)}

                />

            </div>

            <div className="section">

                <h4>

                    What's the plan today?

                </h4>

                <textarea

                    value={prompt}

                    onChange={(e)=>setPrompt(e.target.value)}

                    placeholder="I'm going on a cafe date and want something elegant but affordable..."

                />

            </div>

            <button

                className="generate-btn"

            >

                ✨ Build My Outfit

            </button>

        </div>

    );

}