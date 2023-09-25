import React from 'react';

function PaymentPopup({ isOpen, onClose, onStripePayment, onPaystackPayment }) {
  if (!isOpen) return null;

  return (
    <div className="payment-popup">
      <h2>Select Payment Method</h2>
      <button onClick={onStripePayment}>Pay with Stripe</button>
      <button onClick={onPaystackPayment}>Pay with Paystack</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default PaymentPopup;