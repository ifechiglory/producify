# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)

  - [The challenge](#the-challenge)

  - [Screenshot](#screenshot)

  - [Links](#links)

- [My process](#my-process)

  - [Built with](#built-with)

  - [What I learned](#what-i-learned)

  - [Continued development](#continued-development)

  - [Useful resources](#useful-resources)

- [Author](#author)

- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Add items to the cart and remove them

- Increase/decrease the number of items in the cart using an interactive quantity selector

- See an order confirmation modal when they click "Confirm Order"

- Reset their selections when they click "Start New Order"

- View the optimal layout for the interface depending on their device's screen size

- See hover and focus states for all interactive elements on the page

- Experience smart quantity management where the cart updates based on the displayed quantity

- Auto-close quantity selector after 5 seconds of inactivity or when clicking outside

### Screenshot

![Screenshot](/public/assets/images//screenshot.jpg)

*Add a screenshot of your completed project here. You can use Firefox's screenshot tool or a tool like FireShot to capture your project.*

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)

- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup

- Tailwind CSS for styling

- Flexbox and CSS Grid for layouts

- Mobile-first responsive design

- [React](https://reactjs.org/) - JS library

- React Hooks (useState, useEffect, useRef)

- Custom timeout management for UI interactions

- Local state management for cart functionality

### What I learned

This project was an excellent opportunity to deepen my React skills, particularly in managing complex state interactions and creating intuitive user interfaces. Here are some key learnings:

1. Smart Quantity Management Logic

One of the most interesting challenges was implementing the quantity selector to intelligently update the cart. Instead of simply adding the selected quantity, we calculate the difference between what's displayed and what's already in the cart:

```jsx

const handleIncrement = () => {

  const newDisplayQuantity = displayQuantity + 1;

  setDisplayQuantity(newDisplayQuantity);

  if (cartItem) {

    // Calculate how many more to add to reach target quantity

    const difference = newDisplayQuantity - cartItem.quantity;

    if (difference > 0) {

      onAddToCart(product, difference); // Add only the difference

    }

  } else {

    onAddToCart(product, 1);

  }

};

```

1. Auto-close Timeout Pattern

Implementing an auto-close feature for the quantity selector required careful timeout management:

```jsx

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

```

1. Click Outside Detection

Learning to detect and handle clicks outside a component was crucial for good UX:

```jsx

useEffect(() => {

  const handleClickOutside = (event) => {

    if (cardRef.current && !cardRef.current.contains(event.target)) {

      if (isSelectorOpen) {

        setIsSelectorOpen(false);

        setDisplayQuantity(1);

      }

    }

  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => document.removeEventListener("mousedown", handleClickOutside);

}, [isSelectorOpen]);

```

1. Props Drilling vs. Component Composition

I learned the importance of passing the right props down to child components. Initially, the decrement function wasn't working because `onUpdateQuantity` and `cartItem` weren't being passed to `ProductCard`:

```jsx

// Before (buggy)

<ProductCard

  product={product}

  onAddToCart={addToCart}

/>

// After (fixed)

<ProductCard

  product={product}

  onAddToCart={addToCart}

  onUpdateQuantity={updateQuantity}

  cartItem={cartItem}

/>

```

### Continued development

In future projects, I want to focus on:

- State Management: Exploring more robust state management solutions like Context API or Redux for larger applications

- Performance Optimization: Implementing memoization techniques like `useMemo` and `React.memo` to prevent unnecessary re-renders

- Accessibility: Ensuring all interactive elements are fully accessible with proper ARIA labels and keyboard navigation

- Testing: Adding unit and integration tests using React Testing Library or Jest

- Animation: Implementing smooth transitions for the quantity selector and modal using Framer Motion or CSS transitions

### Useful resources

- [React Official Documentation](https://reactjs.org/docs/getting-started.html) - The go-to resource for all things React

- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Invaluable for styling without leaving my HTML

- [useRef vs useState in React](https://www.freecodecamp.org/news/differences-between-useref-and-usestate/) - Helped me understand when to use refs vs state

- [Custom Hooks in React](https://www.freecodecamp.org/news/how-to-create-react-hooks/) - Great guide for creating reusable logic

## Author

- Website - [Ifechukwu Edet](https://v4portfolio.netlify.app/)

- Frontend Mentor - [@ifechiglory](https://www.frontendmentor.io/profile/ifechiglory)

## Acknowledgments

Special thanks to the Frontend Mentor community for providing such realistic challenges that mirror real-world projects. This project helped me understand the intricacies of building interactive e-commerce components and the importance of thoughtful UX design. The iterative process of debugging and refining the quantity selector logic was particularly educational.
