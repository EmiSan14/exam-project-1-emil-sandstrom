"use strict";

import * as importsFunctions1 from "./functions-1.js";

let cart = [];

const emptyCartMessage = document.querySelector(".empty-cart-message");
const cartPageCart = document.querySelector(".cart-products");
const cartPageSummaryTable = document.querySelector(".summary-table-cart");

function whenCartIsEmpty() {
  emptyCartMessage.classList.remove("hidden");
  /* DON'T FORGET STYLING */
}

function populateCart(cartFromStorage) {
  console.log("cartFromStorage:", cartFromStorage);
  emptyCartMessage.classList.add("hidden");
  cartFromStorage.forEach((cartItem) => {
    /* Container for product */
    const cartProduct = document.createElement("figure");
    cartProduct.classList.add("cart-product");

    /* Image */
    const cartImage = document.createElement("img");
    console.log("cartItem.image.url:", cartItem.item.image.url);
    cartImage.setAttribute("src", cartItem.item.image.url);
    cartImage.setAttribute("alt", cartItem.item.description);
    cartProduct.appendChild(cartImage);

    /* Container for information */
    const cartProductInformation = document.createElement("div");
    cartProductInformation.classList.add("cart-product-information");
    cartProduct.appendChild(cartProductInformation);

    /* Product Name */
    const productTitle = document.createElement("h4");
    productTitle.textContent = cartItem.item.title;
    cartProductInformation.appendChild(productTitle);

    /* Price-Container */
    const productPrices = document.createElement("div");
    productPrices.classList.add("cart-product-prices");
    cartProductInformation.appendChild(productPrices);

    /* Prices */
    const productPrice = document.createElement("p");
    const productDiscountedPrice = document.createElement("p");
    productPrice.textContent = cartItem.item.price;
    productDiscountedPrice.textContent = cartItem.item.discountedPrice;
    productPrices.appendChild(productPrice);
    productPrices.appendChild(productDiscountedPrice);
    importsFunctions1.checkPrices(productPrice, productDiscountedPrice);

    /* Star-rating */
    const productStars = document.createElement("div");
    productStars.classList.add("cart-stars");
    cartProductInformation.appendChild(productStars);
    importsFunctions1.addStars(productStars, cartItem.item.rating);

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
    qtyPickerQty.textContent = cartItem.quantity;
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
  const cartPageSummaryItems = document.createElement("div");
  cartPageSummaryItems.classList.add("summary-items-cart");
  let totalPrice = 0;
  /* Individual items */
  cartFromStorage.forEach((cartItem) => {
    const summaryItem = document.createElement("div");
    summaryItem.classList.add("summary-item-cart");
    const itemName = document.createElement("h5");
    itemName.textContent = cartItem.item.title;
    const itemQty = document.createElement("p");
    itemQty.classList.add("text-align-center");
    itemQty.textContent = cartItem.item.quantity; // Figure out quantity later;
    const itemPrice = document.createElement("p");
    itemPrice.classList.add("text-align-right");
    console.log("cartItem.price", cartItem.item.price);
    // Figure out later
    const finalItemPrice = cartItem.item.price * cartItem.quantity;
    itemPrice.textContent = `${finalItemPrice}:-`;
    /* Add price to total */
    totalPrice += finalItemPrice;
    summaryItem.appendChild(itemName);
    summaryItem.appendChild(itemQty);
    summaryItem.appendChild(itemPrice);
    cartPageSummaryItems.appendChild(summaryItem);
  });
  // Add to DOM
  cartPageSummaryTable.appendChild(cartPageSummaryItems);

  // Totals container
  const cartPageSummaryTotalsContainer = document.createElement("div");
  cartPageSummaryTotalsContainer.classList.add("summary-totals-cart");

  // Create totals and add to it
  const cartPageSummaryTotals = document.createElement("div");
  cartPageSummaryTotals.classList.add("summary-totals-item-cart");
  const summaryTotalsItems = document.createElement("h5");
  summaryTotalsItems.textContent = "Item(s):";
  const preShippingTotal = document.createElement("p");
  preShippingTotal.textContent = `${totalPrice}:-`;
  cartPageSummaryTotals.appendChild(summaryTotalsItems);
  cartPageSummaryTotals.appendChild(preShippingTotal);
  cartPageSummaryTotalsContainer.appendChild(cartPageSummaryTotals);

  /* Shipping total */
  const cartPageSummaryShipping = document.createElement("div");
  cartPageSummaryShipping.classList.add("summary-totals-shipping-cart");
  const summaryTotalsShipping = document.createElement("h5");
  summaryTotalsShipping.textContent = "Shipping:";
  const shippingTotal = document.createElement("p");
  let shippingCost = 0;
  if (preShippingTotal.textContent > 800) {
    shippingTotal.textContent = `${shippingCost}:-`;
  } else {
    shippingCost += 199;
    shippingTotal.textContent = `${shippingCost}:-`;
  }
  cartPageSummaryShipping.appendChild(summaryTotalsShipping);
  cartPageSummaryShipping.appendChild(shippingTotal);
  cartPageSummaryTotalsContainer.appendChild(cartPageSummaryShipping);

  /* Final cost */
  const cartPageSummaryFinal = document.createElement("div");
  cartPageSummaryFinal.classList.add("summary-totals-total-cart");
  const summaryTotalsFinal = document.createElement("h5");
  summaryTotalsFinal.textContent = "Total:";
  const finalTotal = document.createElement("p");
  finalTotal.textContent = `${totalPrice + shippingCost}:-`;
  cartPageSummaryFinal.appendChild(summaryTotalsFinal);
  cartPageSummaryFinal.appendChild(finalTotal);
  cartPageSummaryTotalsContainer.appendChild(cartPageSummaryFinal);

  // Proceed to checkout-button
  const checkoutButton = document.createElement("a");
  checkoutButton.textContent = "proceed to checkout";
  checkoutButton.setAttribute("href", "../checkout/index.html");

  // Add to DOM
  cartPageSummaryTable.appendChild(cartPageSummaryTotalsContainer);
  cartPageSummaryTable.appendChild(checkoutButton);
}

function clearCartFunctionality() {
  const clearCartButton = document.querySelector(".clear-cart-button");
  const clearCartMessage = document.querySelector(".clear-cart-message");
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
  const fetchedCart = importsFunctions1.fetchCart();
  if (!fetchedCart) {
    whenCartIsEmpty();
  } else {
    populateCart(fetchedCart);
    populateCartSummary(fetchedCart);
    // Add quantity increase and subsequent updating of cart/summary
  }
}

cartPageOnStart();
