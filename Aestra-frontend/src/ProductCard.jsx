import "./ProductCard.css";

export default function ProductCard({ item }) {
  return (
    <div className="product-card">

      <img
        src={item.image}
        alt={item.name}
        className="product-image"
      />

      <div className="product-info">
        <h4>{item.name}</h4>

        <p className="product-price">
          {item.price ? `₹${item.price}` : "Price unavailable"}
        </p>
      </div>

    </div>
  );
}