import { useRef, useState } from "react"
import "./User.css"

function User(){
    const ImageRef = useRef(null);
    const [prompt , setPrompt] = useState("");
    const [style, setStyle] = useState("");
    const [image , setimage] = useState(null);

    const handleClick = ()=>{
        ImageRef.current.click();
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        setimage(file);
    }

    const handlePrompt= (e) => {
        setPrompt(e.target.value)
    }

    const handlesubmit =async (e) =>{
        e.preventDefault();
        if (!image) {
            alert("Please upload an image.");
            return;
        }

        if (!prompt.trim()) {
            alert("Please enter a prompt.");
            return;
        }

        const formData = new FormData();

        formData.append("image", image);
        formData.append("prompt", prompt);
        formData.append("style", style);

        try{
        const response = await fetch("http://localhost:3000/find",
            {
                method:"POST",
                body: formData
            }
        );
        if (!response.ok) {
            throw new Error("Server error");
        }
        
        const data = await response.json();
        console.log(data);
        }
        catch(error){
        console.log(error);
        }
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
            <button type="button" onClick={handleClick}>click to Upload</button>
        
            <textarea value={prompt} onChange={handlePrompt} placeholder="tell whats outfit do you looking for..."></textarea>
            <h3 className="feature-heading">Style Preference</h3>
            <div>
                <button onClick={()=>setStyle("Trending")}>Trending</button>
                <button onClick={()=>setStyle("Modern")}>Modern</button>
                <button onClick={()=>setStyle("Classic")}>Classic</button>
                <button onClick={()=> setStyle("Minimal")}>Minimal</button>
                <button onClick={()=>setStyle("Streetwear")}>Streetwear</button>
            </div>
            <button type="button" onClick={handlesubmit}>Find</button>
        </div>
    )
}

export default User