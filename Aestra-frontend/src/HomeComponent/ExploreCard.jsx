import "./ExploreCard.css";

export default function ExploreCard({

    image,
    price,
    isOutfit,
    onTryOn,
    onAdd

}){

    return(

        <div className="explore-card">

            <div className="explore-image">

                <img
                    src={image}
                    alt=""
                />

            </div>

            <div className="explore-footer">

                <span className="price">

                    ₹{price}

                </span>

                <div className="actions">

                    {

                        !isOutfit &&

                        <button
                            className="add-btn"
                            onClick={onAdd}
                        >

                            Add

                        </button>

                    }

                    <button
                        className="try-btn"
                        onClick={onTryOn}
                    >

                        Try On

                    </button>

                </div>

            </div>

        </div>

    );

}