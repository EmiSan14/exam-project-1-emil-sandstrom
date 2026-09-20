"use strict";

import * as importsFunctions1 from "./functions-1.js";

const summaryDetailsContainer = document.querySelector(
  ".summary-details-success",
);
const emailContainer =
  summaryDetailsContainer.firstElementChild.nextElementSibling;
const emailValue = emailContainer.lastElementChild;
const addressContainer = emailContainer.nextElementSibling;
const addressValue = addressContainer.lastElementChild;
const towncityContainer = addressContainer.nextElementSibling;
const towncityValue = towncityContainer.lastElementChild;
const zipcodeContainer = towncityContainer.nextElementSibling;
const zipcodeValue = zipcodeContainer.lastElementChild;
const itemsContainer = zipcodeContainer.nextElementSibling;
const itemsValue = itemsContainer.lastElementChild;
const shippingContainer = itemsContainer.nextElementSibling;
const shippingValue = shippingContainer.lastElementChild;
const totalContainer = shippingContainer.nextElementSibling;
const totalValue = totalContainer.lastElementChild;
const paymentmethodContainer = totalContainer.nextElementSibling;
const paymentmethodValue = paymentmethodContainer.lastElementChild;

const summaryItemsContainerSuccess = document.querySelector(
  ".summary-items-success",
);

function populateSuccessSummary(purchaseInfo) {
  emailValue.textContent = purchaseInfo.email;
  addressValue.textContent = purchaseInfo.address;
  towncityValue.textContent = purchaseInfo.townCity;
  zipcodeValue.textContent = purchaseInfo.zipCode;
  itemsValue.textContent = purchaseInfo.preShippingTotal;
  shippingValue.textContent = purchaseInfo.shipping;
  totalValue.textContent = purchaseInfo.total;
  paymentmethodValue.textContent = purchaseInfo.paymentMethod;
}

function populateSuccessItems(finalCart) {
  finalCart.forEach((cartItem) => {
    // Container
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("summary-item-success");

    // Image
    const itemImage = document.createElement("img");
    itemImage.setAttribute("src", cartItem.image.url);
    itemImage.setAttribute("alt", cartItem.description);
    itemContainer.appendChild(itemImage);

    // Container for details
    const itemDetailsContainer = document.createElement("div");
    itemDetailsContainer.classList.add("summary-item-success-details");

    // Title of item
    const itemHeading = document.createElement("h5");
    itemHeading.classList.add("success-item-header");
    itemHeading.textContent = cartItem.title;
    itemDetailsContainer.appendChild(itemHeading);

    // Quantity of the item
    const itemQty = document.createElement("p");
    itemQty.classList.add("success-item-qty");
    itemQty.textContent = cartItem.quantity; // Figure out earlier
    itemDetailsContainer.appendChild(itemQty);

    // Price of the item (only final, no pre-discount-price)
    const itemPrice = document.createElement("p");
    itemPrice.classList.add("success-item-price");
    itemPrice.textContent = `${cartItem.price}:-`;
    itemDetailsContainer.appendChild(itemPrice);

    // Append to items-part of summary
    itemContainer.appendChild(itemDetailsContainer);
    summaryItemsContainerSuccess.appendChild(itemContainer);
  });
}

function successPageOnStart() {
  // FETCH CART AND PAYMENT INFO
  const purchaseInfoJSON = sessionStorage.getItem("purchaseInfo");
  const purchaseInfoFromStorage = JSON.parse(purchaseInfoJSON);

  populateSuccessSummary(purchaseInfoFromStorage);
  populateSuccessItems(cartFromStorage);
}
