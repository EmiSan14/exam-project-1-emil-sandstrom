"use strict";

import * as importsFunctions1 from "./functions-1.js";
import * as importsScript from "./script.js";

let cart = [];

const checkoutPageSummaryItems = document.querySelector(
  ".summary-items-checkout",
);
const checkoutPageSummaryTotalsItem = document.querySelector(
  ".summary-totals-item-checkout",
);
const checkoutPageSummaryShipping = document.querySelector(
  ".summary-totals-shipping-checkout",
);
const checkoutPageSummaryTotal = document.querySelector(
  ".summary-totals-total-checkout",
);

const checkoutSubmitButton = document.getElementById("checkout-submit");
console.log(checkoutSubmitButton);

function populateCheckoutSummary(cartFromStorage) {
  let totalPrice = 0;
  /* Individual items */
  cartFromStorage.forEach((cartItem) => {
    const summaryItem = document.createElement("div");
    summaryItem.classList.add("summary-item-checkout");
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
    checkoutPageSummaryItems.appendChild(summaryItem);
  });

  /* Add to totals */
  const preShippingTotal = checkoutPageSummaryTotalsItem.lastElementChild;
  preShippingTotal.textContent = `${totalPrice}:-`;

  /* Shipping total */
  const shipping = checkoutPageSummaryShipping.lastElementChild;
  let shippingCost = 0;
  if (preShippingTotal > 800) {
    shipping.textContent = `${shippingCost}:-`;
  } else {
    shippingCost += 199;
    shipping.textContent = `${shippingCost}:-`;
  }

  /* Final cost */
  const finalTotal = checkoutPageSummaryTotal.lastElementChild;
  finalTotal.textContent = `${totalPrice + shippingCost}:-`;
}

const firstNameInput = document.getElementById("first-name-checkout");
const lastNameInput = document.getElementById("last-name-checkout");
const addressInput = document.getElementById("address-checkout");
const townCityInput = document.getElementById("town-city-checkout");
const provinceInput = document.getElementById("province-checkout");
const houseUnitAptNrInput = document.getElementById(
  "house-unit-apt-nr-checkout",
);
const postalCodeInput = document.getElementById("postal-code-checkout");

function addFormValuesToStorage() {
  let formValues = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    address: addressInput.value,
    townCity: townCityInput.value,
    province: provinceInput.value,
    houseUnitAptNr: houseUnitAptNrInput,
  };
  formValuesJSON = JSON.stringify(formValues);
  sessionStorage.setItem("purchaseInfo", formValuesJSON);
}

checkoutSubmitButton.addEventListener("click", () => {
  checkoutSubmitButton.preventDefault();
});

function checkoutOnStart() {
  populateCheckoutSummary(cart);
}

// DON*T FORGET TO POTENTIALLY REMOVE THE REQUIRED
// ATTRIBUTE OF SOME OF THE FORM-INPUTS
// FIX PATTERNS
// CART-FETCHER NEEDED
