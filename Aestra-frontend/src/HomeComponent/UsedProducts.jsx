import "./UsedProducts.css";
import UsedProductCard from "./UsedProductCard";

import shirt from "../assets/temp.jpg";
import jeans from "../assets/temp.jpg";
import shoes from "../assets/temp.jpg";
import watch from "../assets/temp.jpg";

export default function UsedProducts() {

    // Later this will come from backend

    const products = [

        {
            id:1,
            image:shirt,
            name:"Relaxed Linen Shirt",
            brand:"H&M",
            price:1799
        },

        {
            id:2,
            image:jeans,
            name:"Wide Leg Jeans",
            brand:"Zara",
            price:2599
        },

        {
            id:3,
            image:shoes,
            name:"Chunky Sneakers",
            brand:"Nike",
            price:4499
        },

        {
            id:4,
            image:watch,
            name:"Minimal Watch",
            brand:"Titan",
            price:1999
        }

    ];

    return(

        <div className="used-products">

            <div className="products-header">

                <h2>Products Used</h2>

                <p>

                    Every item shown in the outfit can be purchased individually.

                </p>

            </div>

            <div className="products-list">

                {

                    products.map(product=>(

                        <UsedProductCard

                            key={product.id}

                            image={product.image}
                            name={product.name}
                            brand={product.brand}
                            price={product.price}

                        />

                    ))

                }

            </div>

        </div>

    );

}