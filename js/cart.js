"use strict";

import * as importsFunctions1 from "./functions-1.js";

let cart = [];

const emptyCartMessage = document.querySelector(".empty-cart-message");
const cartPageCart = document.querySelector(".cart-products");
const cartPageSummaryTable = document.querySelector(".summary-table-cart");
const discountCodeApplyButton = document.getElementById(
  "discount-code-apply-button",
);

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
    cartProduct.dataset.buttonid = cartItem.item.id;

    /* Image */
    const cartImage = document.createElement("img");
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
  const clearCartButton = document.createElement("button");
  clearCartButton.classList.add("clear-cart-button");
  clearCartButton.textContent = "clear cart";
  cartPageCart.appendChild(clearCartButton);
}

function populateCartSummary(cartFromStorage) {
  const cartPageSummaryItems = document.createElement("div");
  cartPageSummaryItems.classList.add("summary-items-cart");
  let totalPrice = 0;
  let totalPriceFinal = 0;
  /* Individual items */
  cartFromStorage.forEach((cartItem) => {
    totalPrice = 0;
    const summaryItem = document.createElement("div");
    summaryItem.classList.add("summary-item-cart");
    const itemName = document.createElement("h5");
    itemName.textContent = cartItem.item.title;
    const itemQty = document.createElement("p");
    itemQty.classList.add("text-align-center");
    itemQty.textContent = cartItem.quantity; // Figure out quantity later;
    const itemPrice = document.createElement("p");
    itemPrice.classList.add("text-align-right");
    let finalItemPrice = parseFloat(
      cartItem.item.price * cartItem.quantity,
    ).toFixed(2);
    itemPrice.textContent = `${finalItemPrice}:-`;
    /* Add price to total */
    totalPrice = parseFloat(totalPrice + finalItemPrice);
    summaryItem.appendChild(itemName);
    summaryItem.appendChild(itemQty);
    summaryItem.appendChild(itemPrice);
    cartPageSummaryItems.appendChild(summaryItem);
    totalPriceFinal += totalPrice;
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
  const totalPriceF = parseFloat(totalPriceFinal).toFixed(2);
  preShippingTotal.textContent = `${totalPriceF}:-`;
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
  if (totalPriceF > 800) {
    shippingTotal.textContent = `Free:-`;
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
  const finalTotalPrice = parseFloat(totalPriceF + shippingCost).toFixed(2);
  finalTotal.textContent = `${finalTotalPrice}:-`;
  cartPageSummaryFinal.appendChild(summaryTotalsFinal);
  cartPageSummaryFinal.appendChild(finalTotal);
  cartPageSummaryTotalsContainer.appendChild(cartPageSummaryFinal);

  // Proceed to checkout-button
  const checkoutButton = document.createElement("a");
  checkoutButton.textContent = "proceed to checkout";
  checkoutButton.setAttribute("href", "../checkout/index.html");
  checkoutButton.classList.add("text-align-center");

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
    window.location.reload();
  });
  clearCartCancel.addEventListener("click", () => {
    clearCartMessage.classList.add("hidden");
  });
}

function removeCartItemFunctionality(fetchedCart) {
  const allTrashcanIcons = document.querySelectorAll(".fa-trash-can");
  console.log(allTrashcanIcons);
  allTrashcanIcons.forEach((trashcan) => {
    const cartItemID = trashcan.parentElement.parentElement.dataset.buttonid;
    console.log(cartItemID);
    trashcan.addEventListener("click", () => {
      console.log("fetchedCart", fetchedCart);
      for (let i = 0; i < fetchedCart.length; i++) {
        if (fetchedCart[i].item.id === cartItemID) {
          fetchedCart.splice(i, i + 1);
          localStorage.setItem("cart", JSON.stringify(fetchedCart));
          window.location.reload();
        }
      }
    });
  });
}

function decreaseCartItemQuantity(fetchedCart) {
  const allSubtractButtons = document.querySelectorAll(".subtract-button");

  allSubtractButtons.forEach((button) => {
    const cartItemID =
      button.parentElement.parentElement.parentElement.parentElement.dataset
        .buttonid;
    const quantityNumber = button.nextElementSibling;
    let qty = parseInt(quantityNumber.textContent);
    if (qty === 1) {
      button.setAttribute("disabled", "disabled");
    }
    button.addEventListener("click", () => {
      for (let i = 0; i < fetchedCart.length; i++) {
        if (fetchedCart[i].item.id === cartItemID) {
          qty -= 1;
          fetchedCart[i].quantity = qty;
          localStorage.setItem("cart", JSON.stringify(fetchedCart));
          window.location.reload();
        }
      }
    });
  });
}

function increaseCartItemQuantity(fetchedCart) {
  const allAddButtons = document.querySelectorAll(".add-button");

  allAddButtons.forEach((button) => {
    const cartItemID =
      button.parentElement.parentElement.parentElement.parentElement.dataset
        .buttonid;
    const quantityNumber = button.previousElementSibling;
    let qty = parseInt(quantityNumber.textContent);
    button.addEventListener("click", () => {
      for (let i = 0; i < fetchedCart.length; i++) {
        if (fetchedCart[i].item.id === cartItemID) {
          qty += 1;
          fetchedCart[i].quantity = qty;
          localStorage.setItem("cart", JSON.stringify(fetchedCart));
          window.location.reload();
        }
      }
    });
  });
}

function cartPageOnStart() {
  const fetchedApiToken = sessionStorage.getItem("apiToken");
  const fetchedCart = importsFunctions1.fetchCart();
  if (fetchedCart.length === 0 || !fetchedApiToken) {
    whenCartIsEmpty();
  } else {
    populateCart(fetchedCart);
    populateCartSummary(fetchedCart);
    clearCartFunctionality();
    removeCartItemFunctionality(fetchedCart);
    decreaseCartItemQuantity(fetchedCart);
    increaseCartItemQuantity(fetchedCart);
  }
}

function discountCodeApplyButtonDisable() {
  discountCodeApplyButton.addEventListener("click", (event) => {
    event.preventDefault();
  });
}

cartPageOnStart();
decreaseCartItemQuantity();
discountCodeApplyButtonDisable();
// localStorage.removeItem("cart");
