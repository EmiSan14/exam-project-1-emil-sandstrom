"use strict";

import * as importsStartPage from "./start-page";

const specificProduct = document.querySelector(".specific-product");
const productImage = specificProduct.firstElementChild;
const productInformation = document.querySelector(
  ".specific-product-information",
);
const productPrices = document.querySelector(".specific-product-prices");
const productStars = document.querySelector(".specific-product-stars");
const productReviewsAndTags = document.querySelector(
  ".specific-product-reviews-and-tags",
);

const clickedProductID = localStorage.getItem("clickedProductID");
console.log("clickedProductID:", clickedProductID);

function addReview(apiProduct) {
  const reviewItem = document.createElement("div");
  reviewItem.classList.add("review");
  if (apiProduct.reviews.length === 0) {
    const reviewNameNone = document.createElement("h3");
    reviewNameNone.textContent = "No reviews yet";
    reviewItem.appendChild(reviewNameNone);
  } else {
    apiProduct.reviews.forEach((review) => {
      const reviewName = document.createElement("h3");
      reviewName.classList.add("review-name");
      reviewName.textContent = review.username;
      const reviewDescription = document.createElement("p");
      reviewDescription.classList.add("review-text");
      reviewDescription.textContent = review.description;
      const reviewStars = document.createElement("div");
      reviewStars.classList.add("specific-product-stars");
      importsStartPage.addStars(reviewStars, review.rating);
    });
  }
}

function populateSpecificProductPage(product) {
  const productTitle = document.createElement("h2");
  const productDescription = document.createElement("h3");
  const productPrice = document.createElement("p");
  const productDiscountedPrice = document.createElement("p");

  importsStartPage.changeImage(productImage, product);
  productTitle.textContent = product.title;
  productDescription.textContent = product.description;
  productPrice.textContent = product.price;
  productDiscountedPrice.textContent = product.discountedPrice;
  importsStartPage.checkPrices(productPrice, productDiscountedPrice);
  importsStartPage.changeStars(productPrices, product.rating);
}
