import React from 'react';

function PriceCard({ title, price, onPurchase }) {
  return (
    <div className="price-card">
      <h2>{title}</h2>
      <p>{price}</p>
      <button onClick={onPurchase}>Purchase</button>
    </div>
  );
}

export default PriceCard;