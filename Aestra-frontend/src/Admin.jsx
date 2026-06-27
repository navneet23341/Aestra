import { useRef, useState } from "react"
import './Admin.css'

function Admin(){
    const imageRef = useRef(null);
    const [title , settitle] = useState("");
    const [brand , setbrand] = useState("");
    const [price , setprice] = useState("");
    const [gender, setgender] = useState("");
    const [category , setcategory] = useState("");
    const [link , setlink] = useState("");

    const [image,setImage]= useState(null);

    const handleClick = (e)=>{
        e.preventDefault();
        imageRef.current.click();
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        setImage(e.target.files[0]);
    }

    const htitle = (e)=>{
        settitle(e.target.value);
    }

    const hbrand = (e) => {
        setbrand(e.target.value);
    }

    const hprice = (e) =>{
        setprice(e.target.value);
    }

    const hgender = (e)=>{
        setgender(e.target.value);
    }
    const hcategory =(e)=>{
        setcategory(e.target.value);
    }

    const hlink = (e)=>{
        setlink(e.target.value);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const formData = new FormData();

        formData.append("image",image);
        formData.append("title",title);
        formData.append("brand",brand);
        formData.append("price",price);
        formData.append("gender",gender);
        formData.append("category",category);
        formData.append("link",link);

        const response = await fetch(
            "http://localhost:3000/find",
            {
                method:"POST",
                body:formData
            }
        );

        const data=await response.json();

        console.log(data);
    }


    return(<div className="admin">
        <form>
            <h1>Upload Clothing</h1>

            <span>
                <label>Title</label>
                <input value={title} type="text" onChange={htitle}></input>
            </span>
            <span>
                <label>Brand</label>
                <input type="text" value={brand} onChange={hbrand}></input>
            </span>
            <span>
                <label>Price</label>
                <input type="text" value={price} onChange={hprice}></input>
            </span>
            <span>
                <label>Gender</label>
                <input type="text" value={gender} onChange={hgender}></input>
            </span>
            <span>
                <label>Category</label>
                <input type="text" value={category} onChange={hcategory}></input>
            </span>
            <span>
                <label>Buy link</label>
                <input type="text" value={link} onChange={hlink}></input>
            </span>
            
            <input ref={imageRef} type="file" onChange={handleChange} accept="image/*" style={{display:"none"}}></input>

            <button onClick={handleClick} type="button" className="upload-btn">upload</button>

             <button
        type="submit"
        className="submit-btn"
        onClick={handleSubmit}
    >
        Upload Product
    </button>

        </form>
        
    </div>)
}

export default Admin