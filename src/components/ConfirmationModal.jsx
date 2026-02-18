import React from "react";

const ConfirmationModal = ({
  cartItems,
  totalPrice,
  onStartNewOrder,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <article
        className="bg-white rounded-xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close confirmation dialog"
        >
          <span className="text-2xl" aria-hidden="true">
            &times;
          </span>
        </button>

        <header className="mb-4">
          <img
            src="/assets/images/icon-order-confirmed.svg"
            alt=""
            className="w-14 h-14"
            aria-hidden="true"
          />
          <h2
            id="confirmation-title"
            className="text-2xl font-bold text-gray-800 mb-2"
          >
            Order Confirmed
          </h2>
          <p id="confirmation-dialog-description" className="text-gray-500">
            We hope you enjoy your food!
          </p>
        </header>

        <div className="bg-[#f4edeb] rounded-lg p-4 mb-6">
          <ul className="divide-y" aria-label="Ordered items">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center py-3 first:pt-0 last:pb-0"
              >
                <img
                  src={item.image.thumbnail}
                  alt=""
                  className="w-12 h-12 rounded object-cover mr-3"
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="font-bold text-[#c73a0f]"
                      aria-label="Quantity"
                    >
                      {item.quantity}x
                    </span>
                    <span className="text-gray-500">
                      <span className="sr-only">at</span> @ $
                      {item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                <p className="font-bold text-gray-800">
                  <span className="sr-only">Item total:</span>$
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <footer className="flex justify-between items-center pt-4 mt-2 border-t border-gray-300">
            <span className="text-gray-600">Order Total</span>
            <span className="text-2xl font-bold text-gray-800">
              <span className="sr-only">:</span> ${totalPrice.toFixed(2)}
            </span>
          </footer>
        </div>

        <button
          onClick={onStartNewOrder}
          className="w-full bg-[#c73a0f] text-white py-3 rounded-full font-medium hover:bg-[#a52f0c] transition-colors transform hover:scale-105 active:scale-95"
          aria-label="Start new order"
        >
          Start New Order
        </button>
      </article>
    </div>
  );
};

export default ConfirmationModal;
