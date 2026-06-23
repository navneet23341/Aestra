import { useRef, useState } from "react"
import "./User.css"

function User(){
    const ImageRef = useRef(null);
    const [prompt , setPrompt] = useState("");

    const handleClick = ()=>{
        ImageRef.current.click();
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
    }

    const handlePrompt= (e) => {
        setPrompt(e.target.value)
    }

    return(
        <div className="box-1">
            <h1>Your Look</h1>
            <h2>AI Fashion Stylist</h2>
            <h3>
            Upload a photo and describe the outfit you're looking for.
            </h3>
            <input ref={ImageRef} type="file" accept="image/*" onChange={handleChange} style={{display:"none"}}>
            </input>
            <h3 className="feature-heading">click to Upload</h3>
            <button onClick={handleClick}>click to Upload</button>
        
            <textarea value={prompt} onChange={handlePrompt} placeholder="tell whats outfit do you looking for..."></textarea>
            <h3 className="feature-heading">Style Preference</h3>
            <div>
                <button>Trending</button>
                <button>Modern</button>
                <button>Classic</button>
                <button>Minimal</button>
                <button>Streetwear</button>
            </div>
            <button>Find</button>
        </div>
    )
}

export default User