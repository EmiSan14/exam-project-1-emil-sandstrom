"use strict";

import * as importsFunctions1 from "./functions-1.js";

let cart = [];

const emptyCartMessage = document.querySelector(".empty-cart-message");
const cartPageCart = document.querySelector(".cart-products");
const cartPageSummary = document.querySelector(".cart-summary");
const cartPageSummaryItems = document.querySelector(".summary-items-cart");
const cartPageSummaryTotals = document.querySelector(
  ".summary-totals-item-cart",
);
const cartPageSummaryShipping = document.querySelector(
  ".summary-totals-shipping-cart",
);
const cartPageSummaryTotalsTotal = document.querySelector(
  ".summary-totals-total-cart",
);

function whenCartIsEmpty() {
  emptyCartMessage.classList.remove("hidden");
  /* DON'T FORGET STYLING */
}

function populateCart(cartFromStorage) {
  emptyCartMessage.classList.add("hidden");
  cartFromStorage.forEach((cartItem) => {
    /* Container for product */
    const cartProduct = document.createElement("figure");
    cartProduct.classList.add("cart-product");

    /* Image */
    const cartImage = document.createElement("img");
    cartImage.src = cartItem.image.url;
    cartImage.alt = cartItem.description;

    /* Container for information */
    const cartProductInformation = document.createElement("div");
    cartProductInformation.classList.add("cart-product-information");
    cartProduct.appendChild(cartProductInformation);

    /* Product Name */
    const productTitle = document.createElement("h4");
    productTitle.textContent = cartItem.title;
    cartProductInformation.appendChild(productTitle);

    /* Price-Container */
    const productPrices = document.createElement("div");
    productPrices.classList.add("cart-product-prices");
    cartProductInformation.appendChild(productPrices);

    /* Prices */
    const productPrice = document.createElement("p");
    const productDiscountedPrice = document.createElement("p");
    productPrice.textContent = cartItem.price;
    productDiscountedPrice.textContent = cartItem.discountedPrice;
    productPrices.appendChild(productPrice);
    productPrices.appendChild(productDiscountedPrice);
    importsFunctions1.checkPrices(productPrice, productDiscountedPrice);

    /* Star-rating */
    const productStars = document.createElement("div");
    productStars.classList.add("cart-stars");
    cartProductInformation.appendChild(productStars);
    importsFunctions1.addStars(productStars, cartItem.rating);

    /* Quantity-picker */
    const productQtyPickerAndSizePicker = document.createElement("div");
    productQtyPickerAndSizePicker.classList.add("qty-picker-and-size-btn-cart");
    cartProductInformation.appendChild(productQtyPickerAndSizePicker);
    const productQtyPicker = document.createElement("div");
    productQtyPicker.classList.add("qty-picker-cart");
    productQtyPickerAndSizePicker.appendChild(productQtyPicker);
    const qtyPickerButtonSubtract = document.createElement("button");
    qtyPickerButtonSubtract.classList.add("subtract-button");
    qtyPickerButtonSubtract.textContent = `\u2212`;
    const qtyPickerQty = document.createElement("p");
    qtyPickerQty.textContent = 1;
    const qtyPickerButtonAdd = document.createElement("button");
    qtyPickerButtonAdd.classList.add("add-button");
    qtyPickerButtonAdd.textContent = "+";
    productQtyPicker.appendChild(qtyPickerButtonSubtract);
    productQtyPicker.appendChild(qtyPickerQty);
    productQtyPicker.appendChild(qtyPickerButtonAdd);

    /* Icon for removing cart-item */
    const trashcanCart = document.createElement("div");
    trashcanCart.classList.add("trashcan-cart");
    cartProduct.appendChild(trashcanCart);
    const trashcanIcon = document.createElement("i");
    trashcanIcon.classList.add("fa-regular");
    trashcanIcon.classList.add("fa-trash-can");
    trashcanCart.appendChild(trashcanIcon);

    /* Add to DOM */
    cartPageCart.appendChild(cartProduct);
  });
}

function populateCartSummary(cartFromStorage) {
  let totalPrice = 0;
  /* Individual items */
  cartFromStorage.forEach((cartItem) => {
    const summaryItem = document.createElement("div");
    summaryItem.classList.add("summary-item-cart");
    const itemName = document.createElement("h5");
    itemName.textContent = cartItem.title;
    const itemQty = document.createElement("p");
    itemQty.classList.add("text-align-center");
    itemQty.textContent = cartItem.quantity; // Figure out later;
    const itemPrice = document.createElement("p");
    itemPrice.classList.add("text-align-right");
    const finalItemPrice = cartItem.price * cartItem.quantity;
    itemPrice.textContent = `${finalItemPrice}:-`;
    /* Add price to total */
    totalPrice += finalItemPrice;
    summaryItem.appendChild(itemName);
    summaryItem.appendChild(itemQty);
    summaryItem.appendChild(itemPrice);
    cartPageSummaryItems.appendChild(summaryItem);
  });

  /* Add to totals */
  const preShippingTotal = cartPageSummaryTotals.lastElementChild;
  preShippingTotal.textContent = `${totalPrice}:-`;

  /* Shipping total */
  const shipping = cartPageSummaryShipping.lastElementChild;
  let shippingCost = 0;
  if (preShippingTotal > 800) {
    shipping.textContent = `${shippingCost}:-`;
  } else {
    shippingCost += 199;
    shipping.textContent = `${shippingCost}:-`;
  }

  /* Final cost */
  const finalTotal = cartPageSummaryTotalsTotal.lastElementChild;
  finalTotal.textContent = `${totalPrice + shippingCost}:-`;
}

function clearCartFunctionality() {
  const clearCartButton = document.querySelector(".clear-cart-button");
  const clearCartMessage = document.querySelector("clear-cart-message");
  const clearCartConfirm = document.querySelector(".clear-cart-confirm");
  const clearCartCancel = document.querySelector(".clear-cart-cancel");
  clearCartButton.addEventListener("click", () => {
    clearCartMessage.classList.remove("hidden");
  });
  clearCartConfirm.addEventListener("click", () => {
    clearCartMessage.classList.add("hidden");
    localStorage.removeItem("cart");
    cartPageOnStart();
  });
  clearCartCancel.addEventListener("click", () => {
    clearCartMessage.classList.add("hidden");
  });
}

function cartPageOnStart() {
  clearCartFunctionality();
  importsFunctions1.fetchCart();
  if (!cart) {
    whenCartIsEmpty();
  } else {
    populateCart(cart);
    populateCartSummary(cart);
    // Add quantity increase and subsequent updating of cart/summary
  }
}

cartPageOnStart();
