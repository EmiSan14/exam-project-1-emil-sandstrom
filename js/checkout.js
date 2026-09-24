"use strict";

import * as importsFunctions1 from "./functions-1.js";
import * as importsScript from "./script.js";

let cart = [];

const checkoutPageSummaryTable = document.querySelector(
  ".summary-table-checkout",
);

const firstNameInput = document.getElementById("first-name-checkout");
const lastNameInput = document.getElementById("last-name-checkout");
const addressInput = document.getElementById("address-checkout");
const townCityInput = document.getElementById("town-city-checkout");
const provinceInput = document.getElementById("province-checkout");
const houseUnitAptNrInput = document.getElementById(
  "house-unit-apt-nr-checkout",
);
const postalCodeInput = document.getElementById("postal-code-checkout");
const checkoutSubmitButton = document.getElementById("checkout-submit");

/* Adding items with their price and quantity to the summary */
function populateCheckoutSummary(cartFromStorage) {
  const checkoutPageSummaryItems = document.createElement("div");
  checkoutPageSummaryItems.classList.add("summary-items-cart");
  let totalPrice = 0;
  let totalPriceFinal = 0;
  /* Individual items */
  cartFromStorage.forEach((cartItem) => {
    totalPrice = 0;
    const summaryItem = document.createElement("div");
    summaryItem.classList.add("summary-item-checkout");
    const itemName = document.createElement("h5");
    itemName.textContent = cartItem.item.title;
    const itemQty = document.createElement("p");
    itemQty.classList.add("text-align-center");
    itemQty.textContent = cartItem.quantity;
    const itemPrice = document.createElement("p");
    itemPrice.classList.add("text-align-right");
    let finalItemPrice = parseFloat(
      cartItem.item.discountedPrice * cartItem.quantity,
    ).toFixed(2);
    itemPrice.textContent = `${finalItemPrice}:-`;
    /* Add price to total */
    totalPrice = parseFloat(totalPrice + finalItemPrice);
    summaryItem.appendChild(itemName);
    summaryItem.appendChild(itemQty);
    summaryItem.appendChild(itemPrice);
    checkoutPageSummaryItems.appendChild(summaryItem);
    totalPriceFinal += totalPrice;
  });

  const totalPriceF = parseFloat(totalPriceFinal).toFixed(2);
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
  preShippingTotal.textContent = `${totalPriceF}:-`;
  preShippingTotal.classList.add("pre-shipping-total");
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
  if (totalPriceF > 800) {
    shippingTotal.textContent = `Free`;
  } else {
    shippingCost += 199;
    shippingTotal.textContent = `${shippingCost}:-`;
  }
  shippingTotal.classList.add("shipping-total");
  checkoutPageSummaryShipping.appendChild(summaryTotalsShipping);
  checkoutPageSummaryShipping.appendChild(shippingTotal);
  checkoutPageSummaryTotalsContainer.appendChild(checkoutPageSummaryShipping);

  /* Final cost */
  const checkoutPageSummaryFinal = document.createElement("div");
  checkoutPageSummaryFinal.setAttribute("id", "summary-totals-total-checkout");
  const summaryTotalsFinal = document.createElement("h5");
  summaryTotalsFinal.textContent = "Total:";
  const finalTotal = document.createElement("p");
  let totalPriceFloat = parseFloat(totalPriceF);
  const finalTotalPrice = (totalPriceFloat + shippingCost).toFixed(2);
  finalTotal.textContent = `${finalTotalPrice}:-`;
  finalTotal.classList.add("final-total");
  checkoutPageSummaryFinal.appendChild(summaryTotalsFinal);
  checkoutPageSummaryFinal.appendChild(finalTotal);
  checkoutPageSummaryTotalsContainer.appendChild(checkoutPageSummaryFinal);

  // Add to DOM
  checkoutPageSummaryTable.appendChild(checkoutPageSummaryTotalsContainer);
}

/* Adding the values from page to be used in summary on
success screen as more comprehensive summary */
function addFormValuesToStorage() {
  const checkedPaymentOption = document.querySelector(
    "input[name=payment-option]:checked",
  );
  const chosenPaymentOption =
    checkedPaymentOption.nextElementSibling.textContent;
  const itemsValue = document.querySelector(".pre-shipping-total");
  const shippingCost = document.querySelector(".shipping-total");
  const finalTotalPrice = document.querySelector(".final-total");
  let formValues = {
    email: sessionStorage.getItem("email"),
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    address: addressInput.value,
    townCity: townCityInput.value,
    province: provinceInput.value,
    houseUnitAptNr: houseUnitAptNrInput.value,
    postalCode: postalCodeInput.value,
    preShippingTotal: itemsValue.textContent,
    shipping: shippingCost.textContent,
    total: finalTotalPrice.textContent,
    paymentOption: chosenPaymentOption,
  };
  const formValuesJSON = JSON.stringify(formValues);
  sessionStorage.setItem("purchaseInfo", formValuesJSON);
}

/* Logic for adding values to storage to be used on success-screen */
checkoutSubmitButton.addEventListener("click", (event) => {
  const allValues = [
    firstNameInput,
    lastNameInput,
    addressInput,
    townCityInput,
    provinceInput,
    houseUnitAptNrInput,
    postalCodeInput,
  ];
  event.preventDefault();
  addFormValuesToStorage();
  const falseValues = [];
  allValues.forEach((value) => {
    const checkedValue = value.checkValidity();
    if (checkedValue === false) {
      falseValues.push(checkedValue);
      value.style.borderColor = "#B30108";
    }
  });
  if (falseValues.length === 0) {
    addFormValuesToStorage();
    window.location.assign("../success/index.html");
  }
});

function checkoutPageOnStart() {
  const fetchedApiToken = sessionStorage.getItem("apiToken");
  importsFunctions1.mobileDropdownMenu();
  importsFunctions1.colorToIcons(fetchedApiToken);
  const fetchedCart = importsFunctions1.fetchCart();
  populateCheckoutSummary(fetchedCart);
}

checkoutPageOnStart();
