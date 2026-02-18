import React, { useState, useRef, useEffect } from "react";

const ProductCard = ({ product, onAddToCart, onUpdateQuantity, cartItem }) => {
  const [displayQuantity, setDisplayQuantity] = useState(1);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const cardRef = useRef(null);
  const timeoutRef = useRef(null);

  const { image, name, category, price } = product;
  const cartQuantity = cartItem?.quantity || 0;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        if (isSelectorOpen) {
          setIsSelectorOpen(false);
          setDisplayQuantity(1);
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSelectorOpen]);

  useEffect(() => {
    if (isSelectorOpen) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsSelectorOpen(false);
        setDisplayQuantity(1);
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isSelectorOpen]);

  const handleAddToCartClick = () => {
    onAddToCart(product, 1);
    setIsSelectorOpen(true);
    setDisplayQuantity(1);
  };

  const handleIncrement = () => {
    const newDisplayQuantity = displayQuantity + 1;
    setDisplayQuantity(newDisplayQuantity);

    if (cartItem) {
      const difference = newDisplayQuantity - cartItem.quantity;
      if (difference > 0) {
        onAddToCart(product, difference);
      }
    } else {
      onAddToCart(product, 1);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsSelectorOpen(false);
        setDisplayQuantity(1);
      }, 5000);
    }
  };

  const handleDecrement = () => {
    if (displayQuantity > 1) {
      const newDisplayQuantity = displayQuantity - 1;
      setDisplayQuantity(newDisplayQuantity);

      if (cartItem) {
        onUpdateQuantity(cartItem.id, newDisplayQuantity);
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setIsSelectorOpen(false);
          setDisplayQuantity(1);
        }, 5000);
      }
    }
  };

  return (
    <article
      ref={cardRef}
      className=" rounded-lg p-4 flex flex-col transition-shadow"
      aria-labelledby={`product-${name.replace(/\s+/g, "-")}-title`}
    >
      <div className="relative mb-4">
        <picture>
          <source media="(min-width: 1024px)" srcSet={image.desktop} />
          <source media="(min-width: 768px)" srcSet={image.tablet} />
          <source media="(max-width: 767px)" srcSet={image.mobile} />
          <img
            src={image.thumbnail}
            alt={name}
            className={`w-full h-48 object-cover rounded-lg ${
              cartQuantity > 0 ? "ring-2 ring-[#c73a0f]" : ""
            }`}
          />
        </picture>

        <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-40">
          {!isSelectorOpen ? (
            <button
              onClick={handleAddToCartClick}
              className="w-full rounded-full border border-[#c73a0f] bg-white p-2 flex gap-2 items-center justify-center hover:bg-[#c73a0f] group transition-all cursor-pointer"
              aria-label={`Add ${name} to cart`}
            >
              <img
                src="/assets/images/icon-add-to-cart.svg"
                alt=""
                className="w-4 h-4 group-hover:filter group-hover:brightness-0 group-hover:invert"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-black group-hover:text-white">
                Add to Cart
              </span>
            </button>
          ) : (
            <div
              className="w-full rounded-full bg-[#c73a0f] p-2 flex items-center justify-between"
              role="spinbutton"
              aria-valuenow={displayQuantity}
              aria-valuemin="1"
              aria-valuemax="10"
              aria-label={`Quantity for ${name}`}
            >
              <button
                onClick={handleDecrement}
                className="w-6 h-6 rounded-full border border-white text-white flex items-center justify-center hover:bg-white hover:text-[#c73a0f] transition-colors cursor-pointer"
                aria-label={`Decrease quantity of ${name}`}
              >
                <span className="text-lg font-bold" aria-hidden="true">
                  -
                </span>
              </button>

              <span className="text-white font-medium" aria-live="polite">
                {displayQuantity}
              </span>

              <button
                onClick={handleIncrement}
                className="w-6 h-6 rounded-full border border-white text-white flex items-center justify-center hover:bg-white hover:text-[#c73a0f] transition-colors cursor-pointer"
                aria-label={`Increase quantity of ${name}`}
              >
                <span className="text-lg font-bold" aria-hidden="true">
                  +
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <p className="text-gray-400 text-sm">{category}</p>
        <h3
          id={`product-${name.replace(/\s+/g, "-")}-title`}
          className="font-semibold text-gray-800"
        >
          {name}
        </h3>
        <p className="text-[#c73a0f] text-lg font-bold">
          <span className="sr-only">Price:</span> ${price.toFixed(2)}
        </p>
      </div>
    </article>
  );
};

export default ProductCard;
