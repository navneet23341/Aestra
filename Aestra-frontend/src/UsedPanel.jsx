import { useState } from "react";
import ProductCard from "./ProductCard";
import "./UsedPanel.css";

export default function UsedPanel({
  templates,
  usedProducts
}) {

  const [activeTab, setActiveTab] =
    useState("template");

  const data =
    activeTab === "template"
      ? templates
      : usedProducts;

  return (
    <div className="used-panel">

      <div className="used-tabs">

        <button
          className={
            activeTab === "template"
              ? "tab active"
              : "tab"
          }
          onClick={() =>
            setActiveTab("template")
          }
        >
          Template
        </button>

        <button
          className={
            activeTab === "used"
              ? "tab active"
              : "tab"
          }
          onClick={() =>
            setActiveTab("used")
          }
        >
          Used
        </button>

      </div>

      <div className="used-content">

        {data.length === 0 ? (
          <div className="empty">
            No items available
          </div>
        ) : (
          data.map(item => (
            <ProductCard
              key={item.id}
              item={item}
            />
          ))
        )}

      </div>

    </div>
  );
}