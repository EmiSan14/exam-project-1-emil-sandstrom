"use strict";

import * as importsFunctions1 from "./functions-1.js";
import * as importsScript from "./script.js";

let cart = [];

const checkoutPageSummaryTable = document.querySelector(
  ".summary-table-checkout",
);

const checkoutSubmitButton = document.getElementById("checkout-submit");
console.log(checkoutSubmitButton);

function populateCheckoutSummary(cartFromStorage) {
  const checkoutPageSummaryItems = document.createElement("div");
  checkoutPageSummaryItems.classList.add("summary-items-cart");
  let totalPrice = 0;
  /* Individual items */
  cartFromStorage.forEach((cartItem) => {
    const summaryItem = document.createElement("div");
    summaryItem.classList.add("summary-item-checkout");
    const itemName = document.createElement("h5");
    itemName.textContent = cartItem.title;
    const itemQty = document.createElement("p");
    itemQty.classList.add("text-align-center");
    itemQty.textContent = cartItem.quantity; // Figure out quantity later;
    const itemPrice = document.createElement("p");
    itemPrice.classList.add("text-align-right");
    console.log("cartItem.price", cartItem.price);
    // Figure out later
    const finalItemPrice = cartItem.price * cartItem.quantity;
    itemPrice.textContent = `${finalItemPrice}:-`;
    /* Add price to total */
    totalPrice += finalItemPrice;
    summaryItem.appendChild(itemName);
    summaryItem.appendChild(itemQty);
    summaryItem.appendChild(itemPrice);
    checkoutPageSummaryItems.appendChild(summaryItem);
  });
  // Add to DOM
  checkoutPageSummaryTable.appendChild(checkoutPageSummaryItems);

  // Totals container
  const checkoutPageSummaryTotalsContainer = document.createElement("div");
  checkoutPageSummaryTotalsContainer.setAttribute(
    "id",
    "summary-totals-checkout",
  );

  // Create totals and add to it
  const checkoutPageSummaryTotals = document.createElement("div");
  checkoutPageSummaryTotals.classList.add("summary-totals-item-checkout");
  const summaryTotalsItems = document.createElement("h5");
  summaryTotalsItems.textContent = "Item(s):";
  const preShippingTotal = document.createElement("p");
  preShippingTotal.textContent = `${totalPrice}:-`;
  checkoutPageSummaryTotals.appendChild(summaryTotalsItems);
  checkoutPageSummaryTotals.appendChild(preShippingTotal);
  checkoutPageSummaryTotalsContainer.appendChild(checkoutPageSummaryTotals);

  /* Shipping total */
  const checkoutPageSummaryShipping = document.createElement("div");
  checkoutPageSummaryShipping.classList.add("summary-totals-shipping-checkout");
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
  checkoutPageSummaryShipping.appendChild(summaryTotalsShipping);
  checkoutPageSummaryShipping.appendChild(shippingTotal);
  checkoutPageSummaryTotalsContainer.appendChild(checkoutPageSummaryShipping);

  /* Final cost */
  const checkoutPageSummaryFinal = document.createElement("div");
  checkoutPageSummaryFinal.setAttribute("id", "summary-totals-total-checkout");
  const summaryTotalsFinal = document.createElement("h5");
  summaryTotalsFinal.textContent = "Total:";
  const finalTotal = document.createElement("p");
  finalTotal.textContent = `${totalPrice.textContent + shippingCost.textContent}:-`;
  checkoutPageSummaryFinal.appendChild(summaryTotalsFinal);
  checkoutPageSummaryFinal.appendChild(finalTotal);
  checkoutPageSummaryTotalsContainer.appendChild(checkoutPageSummaryFinal);

  // Add to DOM
  checkoutPageSummaryTable.appendChild(checkoutPageSummaryTotalsContainer);
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

function checkoutPageOnStart() {
  const fetchedCart = importsFunctions1.fetchCart();
  populateCheckoutSummary(fetchedCart);
}

checkoutPageOnStart();

// DON*T FORGET TO POTENTIALLY REMOVE THE REQUIRED
// ATTRIBUTE OF SOME OF THE FORM-INPUTS
// FIX PATTERNS
// CART-FETCHER NEEDED
