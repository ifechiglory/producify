import React, { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

const Cart = ({ cartItems, onRemoveItem, onClearCart }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleConfirmOrder = () => {
    if (cartItems.length > 0) {
      setShowConfirmation(true);
    }
  };

  const handleStartNewOrder = () => {
    onClearCart();
    setShowConfirmation(false);
  };

  return (
    <>
      <section
        className="bg-white p-6 rounded-lg h-fit sticky top-5"
        aria-label="Cart summary"
      >
        <header className="mb-4">
          <h2 className="font-bold text-[#c73a0f] text-xl">
            Your Cart <span className="sr-only">items:</span> ({totalItems})
          </h2>
        </header>

        {cartItems.length === 0 ? (
          <div
            className="text-center py-8"
            role="status"
            aria-label="Empty cart"
          >
            <img
              src="/assets/images/illustration-empty-cart.svg"
              alt=""
              className="mx-auto mb-4 w-24 h-24"
              aria-hidden="true"
            />
            <p className="text-gray-500">Your cart is empty</p>
            <p className="text-sm text-gray-400 mt-2">
              Add some delicious desserts!
            </p>
          </div>
        ) : (
          <>
            <ul
              className="space-y-4 max-h-96 overflow-y-auto pr-2"
              aria-label="Cart items"
            >
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border-b border-gray-300 pb-4"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className="text-[#c73a0f] font-bold"
                        aria-label="Quantity"
                      >
                        {item.quantity}x
                      </span>
                      <span className="text-gray-400 text-sm">
                        <span className="sr-only">at</span> @ $
                        {item.price.toFixed(2)}
                      </span>
                      <span className="font-semibold text-gray-700">
                        <span className="sr-only">total:</span> $
                        {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1 rounded-full border border-gray-300 hover:border-red-500 hover:bg-red-500 hover:text-white transition-colors ml-2"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <img
                        src="/assets/images/icon-remove-item.svg"
                        alt=""
                        className="w-4 h-4"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="mt-6 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Order Total</span>
                <span className="text-2xl font-bold text-gray-800">
                  <span className="sr-only">:</span> ${totalPrice.toFixed(2)}
                </span>
              </div>

              <p
                className="bg-gray-50 p-3 rounded-lg mb-4 flex items-center justify-center gap-2 text-sm"
                role="note"
              >
                <img
                  src="/assets/images/icon-carbon-neutral.svg"
                  alt=""
                  className="w-5 h-5"
                  aria-hidden="true"
                />
                <span className="text-gray-600">
                  This is a <strong>carbon-neutral</strong> delivery
                </span>
              </p>

              <button
                onClick={handleConfirmOrder}
                className="w-full bg-[#c73a0f] text-white py-3 rounded-full font-medium hover:bg-[#a52f0c] transition-colors transform hover:scale-105 active:scale-95"
                aria-label="Confirm order"
              >
                Confirm Order
              </button>
            </footer>
          </>
        )}
      </section>

      {showConfirmation && (
        <dialog
          open
          className="fixed inset-0 z-50 bg-transparent"
          aria-labelledby="confirmation-dialog-title"
          aria-describedby="confirmation-dialog-description"
        >
          <ConfirmationModal
            cartItems={cartItems}
            totalPrice={totalPrice}
            onStartNewOrder={handleStartNewOrder}
            onClose={() => setShowConfirmation(false)}
          />
        </dialog>
      )}
    </>
  );
};

export default Cart;
