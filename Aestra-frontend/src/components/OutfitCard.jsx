import "./OutfitCard.css";

export default function OutfitCard({ image }) {
  return (
    <div className="outfit-card">
      <img src={image} alt="" />
    </div>
  );
}