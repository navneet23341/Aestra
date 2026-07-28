import "./UsedProductCard.css";

export default function UsedProductCard({

    image,
    name,
    brand,
    price

}){

    return(

        <div className="used-card">

            <img
                src={image}
                alt={name}
                className="used-image"
            />

            <div className="used-info">

                <h3>{name}</h3>

                <p>{brand}</p>

                <span>₹{price}</span>

            </div>

            <button className="buy-btn">

                Buy

            </button>

        </div>

    );

}