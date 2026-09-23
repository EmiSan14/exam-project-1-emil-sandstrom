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
const postalCodeContainer = towncityContainer.nextElementSibling;
const postalCodeValue = postalCodeContainer.lastElementChild;
const itemsContainer = postalCodeContainer.nextElementSibling;
const itemsValue = itemsContainer.lastElementChild;
const shippingContainer = itemsContainer.nextElementSibling;
const shippingValue = shippingContainer.lastElementChild;
const totalContainer = shippingContainer.nextElementSibling;
const totalValue = totalContainer.lastElementChild;
const paymentmOptionContainer = totalContainer.nextElementSibling;
const paymentmOptionValue = paymentmOptionContainer.lastElementChild;

const summaryItemsContainerSuccess = document.querySelector(
  ".summary-items-success",
);

function populateSuccessSummary(purchaseInfo) {
  emailValue.textContent = purchaseInfo.email;
  addressValue.textContent = purchaseInfo.address;
  towncityValue.textContent = purchaseInfo.townCity;
  postalCodeValue.textContent = purchaseInfo.postalCode;
  itemsValue.textContent = purchaseInfo.preShippingTotal;
  shippingValue.textContent = purchaseInfo.shipping;
  totalValue.textContent = purchaseInfo.total;
  paymentmOptionValue.textContent = purchaseInfo.paymentOption;
}

function populateSuccessItems(finalCart) {
  finalCart.forEach((cartItem) => {
    // Container
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("summary-item-success");

    // Image
    const itemImage = document.createElement("img");
    itemImage.setAttribute("src", cartItem.item.image.url);
    itemImage.setAttribute("alt", cartItem.item.description);
    itemContainer.appendChild(itemImage);

    // Container for details
    const itemDetailsContainer = document.createElement("div");
    itemDetailsContainer.classList.add("summary-item-success-details");

    // Title of item
    const itemHeading = document.createElement("h5");
    itemHeading.classList.add("success-item-header");
    itemHeading.textContent = cartItem.item.title;
    itemDetailsContainer.appendChild(itemHeading);

    // Quantity of the item
    const itemQty = document.createElement("p");
    itemQty.classList.add("success-item-qty");
    itemQty.textContent = cartItem.quantity; // Figure out earlier
    itemDetailsContainer.appendChild(itemQty);

    // Price of the item (only final, no pre-discount-price)
    const itemPrice = document.createElement("p");
    itemPrice.classList.add("success-item-price");
    itemPrice.textContent = `${cartItem.item.price}:-`;
    itemDetailsContainer.appendChild(itemPrice);

    // Append to items-part of summary
    itemContainer.appendChild(itemDetailsContainer);
    summaryItemsContainerSuccess.appendChild(itemContainer);
  });
}

function successPageOnStart() {
  // FETCH CART AND PAYMENT INFO
  const purchaseInfoFromStorage = JSON.parse(
    sessionStorage.getItem("purchaseInfo"),
  );
  const cartFromStorage = importsFunctions1.fetchCart();
  console.log(purchaseInfoFromStorage);

  populateSuccessSummary(purchaseInfoFromStorage);
  populateSuccessItems(cartFromStorage);
}

successPageOnStart();
