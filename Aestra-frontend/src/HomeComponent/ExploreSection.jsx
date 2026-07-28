import "./ExploreSection.css";

import ExploreCard from "./ExploreCard";
import OutfitPreview from "./OutfitPreview";

import temp from "../assets/temp.jpg";

export default function ExploreSection(){

    const products=[
        {
            id:1,
            image:temp,
            price:2499,
            isOutfit:false
        },
        {
            id:2,
            image:temp,
            price:3199,
            isOutfit:true
        },
        {
            id:3,
            image:temp,
            price:1899,
            isOutfit:false
        },
        {
            id:4,
            image:temp,
            price:4299,
            isOutfit:true
        },
        {
            id:5,
            image:temp,
            price:2899,
            isOutfit:false
        }
    ];

    return(

        <section className="explore">

            <div className="explore-left">

                <div className="explore-group">

                    <div className="group-header">

                        <h2>Trending</h2>

                        <button>

                            View More →

                        </button>

                    </div>

                    <div className="group-row">

                        {

                            products.map(product=>(

                                <ExploreCard

                                    key={product.id}

                                    image={product.image}
                                    price={product.price}
                                    isOutfit={product.isOutfit}

                                />

                            ))

                        }

                    </div>

                </div>

                <div className="explore-group">

                    <div className="group-header">

                        <h2>Summer Collection</h2>

                        <button>

                            View More →

                        </button>

                    </div>

                    <div className="group-row">

                        {

                            products.map(product=>(

                                <ExploreCard

                                    key={product.id}

                                    image={product.image}
                                    price={product.price}
                                    isOutfit={product.isOutfit}

                                />

                            ))

                        }

                    </div>

                </div>

                <div className="explore-group">

                    <div className="group-header">

                        <h2>Recommended</h2>

                        <button>

                            View More →

                        </button>

                    </div>

                    <div className="group-row">

                        {

                            products.map(product=>(

                                <ExploreCard

                                    key={product.id}

                                    image={product.image}
                                    price={product.price}
                                    isOutfit={product.isOutfit}

                                />

                            ))

                        }

                    </div>

                </div>

            </div>

            <aside className="explore-right">

                <OutfitPreview/>

            </aside>

        </section>

    );

}