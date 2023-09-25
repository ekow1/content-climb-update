// PricingButtons.js
import React from 'react';

const PricingButtons = ({ handleCheckout }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={() => handleCheckout('PRODUCTA')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
      >
        Product A - $5
      </button>
      <button
        onClick={() => handleCheckout('PRODUCTB')}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4"
      >
        Product B - $9
      </button>
      <button
        onClick={() => handleCheckout('PRODUCTC')}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4"
      >
        Product C - $20
      </button>
    </div>
  );
};

export default PricingButtons;
