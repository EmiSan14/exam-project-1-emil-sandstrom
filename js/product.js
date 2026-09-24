"use strict";

import * as importsFunctions1 from "./functions-1.js";
import * as importsScript from "./script.js";

let cart = [];
const specificProduct = document.querySelector(".specific-product");

let clickedProductID = sessionStorage.getItem("clickedProductID");
const apiEndPointSpecificProduct = `https://v2.api.noroff.dev/online-shop/${clickedProductID}`;

const apiItemFull = await importsScript.getSpecificApiProduct(
  apiEndPointSpecificProduct,
);
const apiItem = apiItemFull.data;

const errorMessageDiv = document.querySelector(".error-message-div");
const errorMessageText = errorMessageDiv.firstElementChild;
const errorMessageButton = errorMessageDiv.lastElementChild;
const addedToCartToast = document.querySelector(".added-to-cart-toast-div");

function hideToast() {
  addedToCartToast.classList.add("hidden");
}

function successfulProductAdd() {
  addedToCartToast.classList.remove("hidden");
  setTimeout(hideToast, 3000);
}

function addImage(apiProduct) {
  const productImage = document.createElement("img");
  productImage.src = apiProduct.image.url;
  productImage.alt = apiProduct.description;
  return productImage;
}

/* Adding review using correct container and API-item */
function addReview(container, apiProduct) {
  if (apiProduct.reviews.length === 0) {
    const reviewItem = document.createElement("div");
    reviewItem.classList.add("review");
    const reviewNameNone = document.createElement("h3");
    reviewNameNone.textContent = "No reviews yet";
    reviewItem.appendChild(reviewNameNone);
    container.appendChild(reviewItem);
  } else {
    apiProduct.reviews.forEach((review) => {
      const reviewItem = document.createElement("div");
      reviewItem.classList.add("review");
      const reviewName = document.createElement("h3");
      reviewName.classList.add("review-name");
      reviewName.textContent = review.username;
      const reviewDescription = document.createElement("p");
      reviewDescription.classList.add("review-text");
      reviewDescription.textContent = review.description;
      const reviewStars = document.createElement("div");
      reviewStars.classList.add("specific-product-stars");
      importsFunctions1.addStars(reviewStars, review.rating);
      reviewItem.appendChild(reviewName);
      reviewItem.appendChild(reviewDescription);
      reviewItem.appendChild(reviewStars);
      container.appendChild(reviewItem);
    });
  }
}

/* Adding API-product-data to page */
function populateSpecificProductPage(product) {
  /* SPECIFIC PRODUCT INFORMATION */
  const productInformation = document.createElement("div");
  productInformation.classList.add("specific-product-information");

  const productImage = addImage(product);
  specificProduct.appendChild(productImage);

  const productTitle = document.createElement("h2");
  productTitle.textContent = product.title;
  productInformation.appendChild(productTitle);

  const productDescription = document.createElement("h3");
  productDescription.textContent = product.description;
  productInformation.appendChild(productDescription);

  const productPrices = document.createElement("div");
  productPrices.classList.add("specific-product-prices");
  const productPrice = document.createElement("p");
  const productDiscountedPrice = document.createElement("p");
  productPrice.textContent = product.price;
  productDiscountedPrice.textContent = product.discountedPrice;
  productPrices.appendChild(productPrice);
  productPrices.appendChild(productDiscountedPrice);
  productInformation.appendChild(productPrices);
  importsFunctions1.checkPrices(productPrice, productDiscountedPrice);

  const productStars = document.createElement("div");
  productStars.classList.add("specific-product-stars");
  importsFunctions1.addStars(productStars, product.rating);
  productInformation.appendChild(productStars);

  const productQtyPickerAndSizePicker = document.createElement("div");
  productQtyPickerAndSizePicker.classList.add(
    "qty-picker-and-size-btn-specific-product",
  );
  const productQtyPicker = document.createElement("div");
  productQtyPicker.classList.add("qty-picker-spec-product");
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
  productInformation.appendChild(productQtyPicker);

  const productCTAS = document.createElement("div");
  productCTAS.classList.add("specific-product-ctas");
  const addToCartButton = document.createElement("button");
  addToCartButton.classList.add("add-to-cart-button");
  addToCartButton.textContent = "add to cart";
  importsFunctions1.addID(addToCartButton, product);
  const shareButton = document.createElement("button");
  shareButton.classList.add("share-button");
  shareButton.textContent = "share";
  importsFunctions1.addID(shareButton, product);
  productCTAS.appendChild(addToCartButton);
  productCTAS.appendChild(shareButton);
  productInformation.appendChild(productCTAS);
  specificProduct.appendChild(productInformation);

  /* SPECIFIC PRODUCT REVIEWS AND TAGS */
  const productReviewsAndTags = document.createElement("div");
  productReviewsAndTags.classList.add("specific-product-reviews-and-tags");

  const reviewsHeading = document.createElement("h2");
  reviewsHeading.textContent = "Reviews:";

  productReviewsAndTags.appendChild(reviewsHeading);
  addReview(productReviewsAndTags, product);

  const tagsHeading = document.createElement("h2");
  tagsHeading.textContent = "Tags:";
  productReviewsAndTags.appendChild(tagsHeading);

  const tags = product.tags;
  tags.forEach((tag) => {
    const newTag = document.createElement("a");
    newTag.classList.add("tag");
    newTag.setAttribute("href", "");
    newTag.textContent = tag;
    productReviewsAndTags.appendChild(newTag);
  });

  specificProduct.appendChild(productReviewsAndTags);
}

/* For separate cart with only IDs
 to use in adding/removing items from cart later*/
function addIDsToSeparateCart(cart) {
  const cartOfIDs = [];
  cart.forEach((item) => {
    cartOfIDs.push(item.item.id);
  });
  const cartOfSingleIDOccurrence = [];
  cartOfIDs.forEach((ID) => {
    if (cartOfSingleIDOccurrence.includes(ID)) {
      return;
    } else {
      cartOfSingleIDOccurrence.push(ID);
    }
  });
  localStorage.setItem("cartOfOnlyIDs", cartOfSingleIDOccurrence);
}

/* Checks if cart is empty/not, then adds product and quantity differently based on
if the item is already in cart. If in cart, then just adds to quantity */
function addToCartListener() {
  const addToCartButton = document.querySelector(".add-to-cart-button");
  const receivedToken = sessionStorage.getItem("apiToken");
  const onlyIDsCart = localStorage.getItem("cartOfOnlyIDs");
  addToCartButton.addEventListener("click", () => {
    if (!receivedToken) {
      errorMessageDiv.classList.remove("hidden");
      errorMessageText.textContent =
        "Must be logged in to add product(s) to cart";
    } else {
      const subtractButton = document.querySelector(".subtract-button");
      const quantityNumber = subtractButton.nextElementSibling.textContent;

      if (cart.length === 0) {
        cart.push({ item: apiItem, quantity: quantityNumber });
        localStorage.setItem("cart", JSON.stringify(cart));
        addIDsToSeparateCart(cart);
        successfulProductAdd();
      } else {
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].item.id === apiItem.id) {
            const cartQty = parseInt(cart[i].quantity);
            const pageQty = parseInt(quantityNumber);
            cart[i].quantity = cartQty + pageQty;
            localStorage.setItem("cart", JSON.stringify(cart));
            addIDsToSeparateCart(cart);
            successfulProductAdd();
          }
        }
      }
      if (onlyIDsCart.includes(apiItem.id)) {
        return;
      } else {
        cart.push({ item: apiItem, quantity: quantityNumber });
        localStorage.setItem("cart", JSON.stringify(cart));
        addIDsToSeparateCart(cart);
        successfulProductAdd();
      }
    }
  });
}

/* Quantity-button-logic and not being able to go below 1 */
function addOrSubtract() {
  const subtractButton = document.querySelector(".subtract-button");
  const quantityNumber = subtractButton.nextElementSibling;
  const addButton = document.querySelector(".add-button");
  subtractButton.setAttribute("disabled", "disabled");

  subtractButton.addEventListener("click", () => {
    const numberText = quantityNumber.textContent;
    let currentNumber = parseInt(numberText);
    currentNumber -= 1;
    quantityNumber.textContent = currentNumber;
    if (currentNumber === 1) {
      subtractButton.disabled = true;
    }
    if (currentNumber < 3) {
      addButton.removeAttribute("disabled");
    }
  });

  addButton.addEventListener("click", () => {
    const numberText = quantityNumber.textContent;
    let currentNumber = parseInt(numberText);
    currentNumber += 1;
    quantityNumber.textContent = currentNumber;
    if (currentNumber === 3) {
      addButton.setAttribute("disabled", "disabled");
    }
    if (currentNumber > 1) {
      subtractButton.removeAttribute("disabled");
    }
  });
}

export function fetchCart() {
  const cartInStorage = localStorage.getItem("cart");
  const usableCart = JSON.parse(cartInStorage);
  if (!usableCart) {
    return;
  } else {
    usableCart.forEach((item) => {
      cart.push(item);
    });
  }
}

/* Showing product URL if share-button is clicked */
function shareButtonURL() {
  const shareButton = document.querySelector(".share-button");
  const shareButtonMessageDiv = document.querySelector(
    ".share-button-message-div",
  );
  const shareButtonMessage = document.querySelector(".share-button-message");
  shareButtonMessage.textContent = apiEndPointSpecificProduct;
  const shareButtonMessageDismiss = document.querySelector(
    ".share-button-message-button",
  );
  shareButton.addEventListener("click", () => {
    shareButtonMessageDiv.classList.remove("hidden");
  });
  shareButtonMessageDismiss.addEventListener("click", () => {
    shareButtonMessageDiv.classList.add("hidden");
  });
}

const fetchedApiToken = sessionStorage.getItem("apiToken");
importsFunctions1.colorToIcons(fetchedApiToken);
importsFunctions1.mobileDropdownMenu();
populateSpecificProductPage(apiItem);
importsFunctions1.errorMessageDismiss();
addToCartListener();
fetchCart();
shareButtonURL();
addOrSubtract();
