export default function UploadPhotoModal(){
    const [image, setImage] = useState(null);

    const handleImage = (e) => {
    
        const file = e.target.files[0];
    
        if(!file) return;
    
        if(!file.type.startsWith("image/")){
    
            alert("Please upload an image.");
    
            return;
    
        }
    
        if(image){
            URL.revokeObjectURL(image);
        }
    
        setImage(URL.createObjectURL(file));
    
    }

    useEffect(() => {
    
        return () => {
    
            if(image){
                URL.revokeObjectURL(image);
            }
    
        };
    
    }, [image]); 

    return(
        <>
        {screen === "upload" && (
                    <button
                        className="back-btn"
                        
                        onClick={() => {
                            setImage(null);
                            setScreen("signup")}
                        }
                    >
                        ← Back
                    </button>
                )}

                {screen === "upload" && (

                    <div className="upload-section">

                        <label
                            htmlFor="photo-upload"
                            className="upload-box"
                        >

                            {image ? (

                                <motion.img

                                    src={image}

                                    alt="Preview"

                                    className="preview-image"

                                    initial={{
                                        opacity: 0,
                                        scale: 0.8
                                    }}

                                    animate={{
                                        opacity: 1,
                                        scale: 1
                                    }}

                                    transition={{
                                        duration: 0.3
                                    }}

                                />

                            ) : (

                                <div className="camera-icon">
                                    📷
                                </div>

                            )}

                            <h3>

                                {image
                                    ? "Photo Ready"
                                    : "Upload Your Photo"}

                            </h3>

                            <p>

                                {image
                                    ? "Looks great! You can replace it anytime."
                                    : "Choose a clear full-body image."}

                            </p>

                            <span className="upload-btn">

                                {image
                                    ? "Replace Photo"
                                    : "Browse Files"}

                            </span>

                        </label>

                        <input

                            id="photo-upload"

                            type="file"

                            accept="image/*"

                            onChange={handleImage}

                        />

                    </div>

                )}
        </>
    )
}