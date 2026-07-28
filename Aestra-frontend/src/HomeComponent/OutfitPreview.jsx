import "./OutfitPreview.css";
import outfit from "../assets/model.png";

export default function OutfitPreview(){

    return(

        <div className="outfit-preview">

            <div className="preview-header">

                <h2>Outfit Preview</h2>

                <p>AI Generated Look</p>

            </div>

            <img
                src={outfit}
                alt="Generated Outfit"
            />

        </div>

    );

}