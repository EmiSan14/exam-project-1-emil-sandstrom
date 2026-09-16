import * as importsStart from "./script.js";

const apiItems = await importsStart.getApi();
console.log(apiItems.data);

const carouselContainer = document.querySelector(".carousel-container");
const directionalButtonRight = document.querySelector(
  ".directional-button-right",
);
const directionalButtonLeft = document.querySelector(
  ".directional-button-left",
);

const product1 = document.getElementById("product-1");
const product2 = document.getElementById("product-2");
const product3 = document.getElementById("product-3");
const product4 = document.getElementById("product-4");
const product5 = document.getElementById("product-5");
const product6 = document.getElementById("product-6");
const product7 = document.getElementById("product-7");
const product8 = document.getElementById("product-8");
const product9 = document.getElementById("product-9");
const product10 = document.getElementById("product-10");
const product11 = document.getElementById("product-11");
const product12 = document.getElementById("product-12");

const apiItemsArray = apiItems.data;
const pinkCandyPerfume = apiItemsArray[15];
const blackBoots = apiItemsArray[8];
const goldHeadphones = apiItemsArray[2];
const blackDigitalWatch = apiItemsArray[18];
const pinkShoes = apiItemsArray[19];
const redBag = apiItemsArray[5];
const vanillaPerfume = apiItemsArray[0];
const blackWatch = apiItemsArray[12];
const goldGlasses = apiItemsArray[10];
const wirelessEarbuds = apiItemsArray[4];
const blueShoes = apiItemsArray[11];
const blackHeadphones = apiItemsArray[13];

directionalButtonLeft.addEventListener("click", () => {});

function changePrice(oldPrice, item) {
  if (oldPrice.classList.contains("product-start-number-standard")) {
    oldPrice.textContent = `${item.price}:-`;
  } else if (oldPrice.classList.contains("product-start-number-discounted")) {
    oldPrice.textContent = `${item.discountedPrice}:-`;
  }
}

function checkPrices(standardPrice, discountedPrice) {
  if (standardPrice.textContent === discountedPrice.textContent) {
    standardPrice.remove();
  } else {
    standardPrice.classList.add("price-line-through");
  }
}

function changeValue(oldValue, newValue) {
  oldValue.textContent = newValue;
}

function changeImage(oldImage, apiProduct) {
  oldImage.src = apiProduct.image.url;
  oldImage.alt = apiProduct.title;
}

function changeStars(ratingContainer, rating) {
  const halfStar = document.createElement("p");
  halfStar.textContent = "\u2BE8";
  if (rating === 5) {
    return;
  } else if (rating === 4.5) {
    ratingContainer.lastElementChild.remove();
    ratingContainer.appendChild(halfStar);
  } else if (rating === 4) {
    ratingContainer.lastElementChild.remove();
  } else if (rating === 3.5) {
    ratingContainer.lastElementChild.remove();
    ratingContainer.lastElementChild.remove();
    ratingContainer.appendChild(halfStar);
  } else if (rating === 3) {
    ratingContainer.lastElementChild.remove();
    ratingContainer.lastElementChild.remove();
  } else if (rating === 2.5) {
    ratingContainer.lastElementChild.remove();
    ratingContainer.lastElementChild.remove();
    ratingContainer.lastElementChild.remove();
    ratingContainer.appendChild(halfStar);
  } else if (rating === 2) {
    ratingContainer.lastElementChild.remove();
    ratingContainer.lastElementChild.remove();
    ratingContainer.lastElementChild.remove();
  } else if (rating === 1.5) {
    ratingContainer.lastElementChild.remove();
    ratingContainer.lastElementChild.remove();
    ratingContainer.lastElementChild.remove();
    ratingContainer.lastElementChild.remove();
    ratingContainer.appendChild(halfStar);
  } else if (rating === 1) {
    ratingContainer.lastElementChild.remove();
    ratingContainer.lastElementChild.remove();
    ratingContainer.lastElementChild.remove();
    ratingContainer.lastElementChild.remove();
  } else if (rating === 0.5) {
    ratingContainer.lastElementChild.remove();
    ratingContainer.lastElementChild.remove();
    ratingContainer.lastElementChild.remove();
    ratingContainer.lastElementChild.remove();
    ratingContainer.lastElementChild.remove();
    ratingContainer.appendChild(halfStar);
  } else if (rating === 0) {
    ratingContainer.classList.add("stars-zero");
    const star1 = ratingContainer.firstElementChild;
    star1.textContent = "\u2606";
    const star2 = star1.nextElementSibling;
    star2.textContent = "\u2606";
    const star3 = star2.nextElementSibling;
    star3.textContent = "\u2606";
    const star4 = star3.nextElementSibling;
    star4.textContent = "\u2606";
    const star5 = star4.nextElementSibling;
    star5.textContent = "\u2606";
  }
}

function productGridProduct(gridID, specificAPIProduct) {
  const productImage = gridID.firstElementChild.firstElementChild;
  const productTitle = gridID.firstElementChild.nextElementSibling;
  const productPriceDiv = productTitle.nextElementSibling;
  const priceDOM = productPriceDiv.firstElementChild;
  const discountedPriceDOM = productPriceDiv.lastElementChild;
  const starsContainer = productPriceDiv.nextElementSibling;
  const apiTitle = specificAPIProduct.title;
  const apiPrice = specificAPIProduct.price;
  const apiDiscountedPrice = specificAPIProduct.discountedPrice;
  const apiRating = specificAPIProduct.rating;

  changeImage(productImage, specificAPIProduct);
  changeValue(productTitle, apiTitle);
  changeValue(priceDOM, apiPrice);
  changeValue(discountedPriceDOM, apiDiscountedPrice);
  changeStars(starsContainer, apiRating);

  changePrice(priceDOM, specificAPIProduct);
  changePrice(discountedPriceDOM, specificAPIProduct);

  checkPrices(priceDOM, discountedPriceDOM);
}

productGridProduct(product1, pinkCandyPerfume);
productGridProduct(product2, blackBoots);
productGridProduct(product3, goldHeadphones);
productGridProduct(product4, blackDigitalWatch);
productGridProduct(product5, pinkShoes);
productGridProduct(product6, redBag);
productGridProduct(product7, vanillaPerfume);
productGridProduct(product8, blackWatch);
productGridProduct(product9, goldGlasses);
productGridProduct(product10, wirelessEarbuds);
productGridProduct(product11, blueShoes);
productGridProduct(product12, blackHeadphones);
