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

function addImage(apiProduct) {
  console.log(apiProduct);
  const productImage = document.createElement("img");
  productImage.src = apiProduct.image.url;
  productImage.alt = apiProduct.description;
  return productImage;
}

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

function addToCartListener() {
  const addToCartButton = document.querySelector(".add-to-cart-button");
  const receivedToken = sessionStorage.getItem("apiToken");
  addToCartButton.addEventListener("click", () => {
    if (!receivedToken) {
      // ADD MESSAGE ON SCREEN
    } else {
      const subtractButton = document.querySelector(".subtract-button");
      const quantityNumber = subtractButton.nextElementSibling.textContent;
      cart.push({ item: apiItem, quantity: quantityNumber });
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(localStorage.getItem("cart"));
    }
  });
}

export function fetchCart() {
  const cartInStorage = localStorage.getItem("cart");
  const usableCart = JSON.parse(cartInStorage);
  console.log("cart:", usableCart);
  if (!usableCart) {
    return;
  } else {
    usableCart.forEach((item) => {
      cart.push(item);
    });
  }
}

populateSpecificProductPage(apiItem);
importsFunctions1.errorMessageDismiss();
addToCartListener();
fetchCart();
