import * as importsFunctions1 from "./functions-1.js";
import * as importsStart from "./script.js";

let cart = [];

const apiEndPoint = "https://v2.api.noroff.dev/online-shop";

const productGridSection = document.querySelector(".product-grid-section");

const apiItems = await importsStart.getApi(apiEndPoint, productGridSection);

const carouselContainer = document.querySelector(".carousel-container");
const carouselItemMain = document.getElementById("carousel-item-main");
const carouselItemShampoo = document.getElementById("carousel-item-shampoo");
const carouselItemShoes = document.getElementById("carousel-item-shoes");
const directionalButtonRight = document.querySelector(
  ".directional-button-right",
);
const directionalButtonLeft = document.querySelector(
  ".directional-button-left",
);

const allCarouselAnchors = document.querySelectorAll(".carousel-cta");
const allProductImageAnchors = document.querySelectorAll(
  ".product-image-anchor",
);
const allProductAnchors = document.querySelectorAll(".product-start-cta");

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
const whiteSneakers = apiItemsArray[22];
const organicShampoo = apiItemsArray[17];

/* Show price and discountedPrice in correct way */
export function changePrice(oldPrice, item) {
  if (oldPrice.classList.contains("product-start-number-standard")) {
    oldPrice.textContent = `${item.price}:-`;
  } else if (oldPrice.classList.contains("product-start-number-discounted")) {
    oldPrice.textContent = `${item.discountedPrice}:-`;
  }
}

/* If there is no discountedPrice then delete one from DOM, 
otherwise show its been discounted with a line through */
export function checkPrices(standardPrice, discountedPrice) {
  if (standardPrice.textContent === discountedPrice.textContent) {
    standardPrice.remove();
  } else {
    standardPrice.classList.add("price-line-through");
  }
}

/* Input one value to change to the second */
export function changeValue(oldValue, newValue) {
  oldValue.textContent = newValue;
}

/* Change image for one from API */
export function changeImage(oldImage, apiProduct) {
  oldImage.src = apiProduct.image.url;
  oldImage.alt = apiProduct.title;
}

/* Changing/removing stars based on API-item rating */
export function changeStars(ratingContainer, rating) {
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

/* Adding stars based on rating from API-Item */
export function addStars(ratingContainer, rating) {
  const halfStar = document.createElement("p");
  halfStar.textContent = "\u2BE8";
  const star1 = document.createElement("p");
  star1.textContent = "\u2605";
  const star2 = document.createElement("p");
  star2.textContent = "\u2605";
  const star3 = document.createElement("p");
  star3.textContent = "\u2605";
  const star4 = document.createElement("p");
  star4.textContent = "\u2605";
  const star5 = document.createElement("p");
  star5.textContent = "\u2605";
  const emptyStar1 = ratingContainer.firstElementChild;
  emptyStar1.textContent = "\u2606";
  const emptyStar2 = star1.nextElementSibling;
  emptyStar2.textContent = "\u2606";
  const emptyStar3 = star2.nextElementSibling;
  emptyStar3.textContent = "\u2606";
  const emptyStar4 = star3.nextElementSibling;
  emptyStar4.textContent = "\u2606";
  const emptyStar5 = star4.nextElementSibling;
  emptyStar5.textContent = "\u2606";
  if (rating === 5) {
    ratingContainer.appendChild(star1);
    ratingContainer.appendChild(star2);
    ratingContainer.appendChild(star3);
    ratingContainer.appendChild(star4);
    ratingContainer.appendChild(star5);
  } else if (rating === 4.5) {
    ratingContainer.appendChild(star1);
    ratingContainer.appendChild(star2);
    ratingContainer.appendChild(star3);
    ratingContainer.appendChild(star4);
    ratingContainer.appendChild(halfStar);
  } else if (rating === 4) {
    ratingContainer.appendChild(star1);
    ratingContainer.appendChild(star2);
    ratingContainer.appendChild(star3);
    ratingContainer.appendChild(star4);
  } else if (rating === 3.5) {
    ratingContainer.appendChild(star1);
    ratingContainer.appendChild(star2);
    ratingContainer.appendChild(star3);
    ratingContainer.appendChild(halfStar);
  } else if (rating === 3) {
    ratingContainer.appendChild(star1);
    ratingContainer.appendChild(star2);
    ratingContainer.appendChild(star3);
  } else if (rating === 2.5) {
    ratingContainer.appendChild(star1);
    ratingContainer.appendChild(star2);
    ratingContainer.appendChild(halfStar);
  } else if (rating === 2) {
    ratingContainer.appendChild(star1);
    ratingContainer.appendChild(star2);
  } else if (rating === 1.5) {
    ratingContainer.appendChild(star1);
    ratingContainer.appendChild(halfStar);
  } else if (rating === 1) {
    ratingContainer.appendChild(star1);
  } else if (rating === 0.5) {
    ratingContainer.appendChild(halfStar);
  } else if (rating === 0) {
    ratingContainer.classList.add("stars-zero");
    ratingContainer.appendChild(emptyStar1);
    ratingContainer.appendChild(emptyStar2);
    ratingContainer.appendChild(emptyStar3);
    ratingContainer.appendChild(emptyStar4);
    ratingContainer.appendChild(emptyStar5);
  }
}

export function addHREFtoAnchors(anchor) {
  anchor.setAttribute("href", "product/index.html");
}

/* For knowing what the clicked item's ID is */
export function addID(linkingElement, specificAPIProduct) {
  linkingElement.dataset.buttonid = specificAPIProduct.id;
}

/* Accessing ID later */
export function addProductIDToStorage(anchor) {
  const idToAdd = anchor.dataset.buttonid;
  sessionStorage.removeItem("clickedProductID");
  sessionStorage.setItem("clickedProductID", `${idToAdd}`);
}

/* Adding the correct href-address and product ID to carousel-item-CTAs */
export function carouselCTAS() {
  allCarouselAnchors.forEach((anchor) => {
    addHREFtoAnchors(anchor);
    anchor.addEventListener("click", () => {
      addProductIDToStorage(anchor);
    });
    const mainCarouselCTA = document.querySelector(
      ".carousel-item-information-window",
    ).lastElementChild;
    mainCarouselCTA.setAttribute("href", "");
  });
}

/* Same as above for products */
export function productAnchors() {
  allProductImageAnchors.forEach((anchor) => {
    addHREFtoAnchors(anchor);
    anchor.addEventListener("click", () => {
      addProductIDToStorage(anchor);
    });
  });
  allProductAnchors.forEach((anchor) => {
    addHREFtoAnchors(anchor);
    anchor.addEventListener("click", () => {
      addProductIDToStorage(anchor);
    });
  });
}

/* Adding images and ID to product carousel-items */
export function carouselProduct(carouselID, specificAPIProduct) {
  const carouselImage = carouselID.firstElementChild;
  const carouselInformation = carouselID.lastElementChild;
  const carouselButton = carouselInformation.lastElementChild;

  changeImage(carouselImage, specificAPIProduct);
  addID(carouselButton, specificAPIProduct);
}

/* Adding products to grid */
export function productGridProduct(gridID, specificAPIProduct) {
  const productImageAnchor = gridID.firstElementChild;
  const productImage = gridID.firstElementChild.firstElementChild;
  const productTitle = gridID.firstElementChild.nextElementSibling;
  const productPriceDiv = productTitle.nextElementSibling;
  const priceDOM = productPriceDiv.firstElementChild;
  const discountedPriceDOM = productPriceDiv.lastElementChild;
  const starsContainer = productPriceDiv.nextElementSibling;
  const productButton = gridID.lastElementChild;
  const apiTitle = specificAPIProduct.title;
  const apiPrice = specificAPIProduct.price;
  const apiDiscountedPrice = specificAPIProduct.discountedPrice;
  const apiRating = specificAPIProduct.rating;

  changeImage(productImage, specificAPIProduct);
  changeValue(productTitle, apiTitle);
  changeValue(priceDOM, apiPrice);
  changeValue(discountedPriceDOM, apiDiscountedPrice);
  changeStars(starsContainer, apiRating);
  addID(productButton, specificAPIProduct);
  addID(productImageAnchor, specificAPIProduct);

  changePrice(priceDOM, specificAPIProduct);
  changePrice(discountedPriceDOM, specificAPIProduct);

  checkPrices(priceDOM, discountedPriceDOM);
}

/* Logic for carousel to be able to go from right/left item to left/right when reaching end */
directionalButtonLeft.addEventListener("click", () => {
  if (carouselContainer.dataset.state === "state-start") {
    carouselItemMain.classList.remove("carousel-item-middle");
    carouselItemMain.classList.add("carousel-item-right");
    carouselItemShoes.classList.remove("carousel-item-left");
    carouselItemShoes.classList.add("carousel-item-middle");
    carouselItemShampoo.classList.remove("carousel-item-right");
    carouselItemShampoo.classList.add("carousel-item-left");
    carouselContainer.dataset.state = "state-left";
  } else if (carouselContainer.dataset.state === "state-left") {
    carouselItemShoes.classList.remove("carousel-item-middle");
    carouselItemShoes.classList.add("carousel-item-right");
    carouselItemShampoo.classList.remove("carousel-item-left");
    carouselItemShampoo.classList.add("carousel-item-middle");
    carouselItemMain.classList.remove("carousel-item-right");
    carouselItemMain.classList.add("carousel-item-left");
    carouselContainer.dataset.state = "state-right";
  } else if (carouselContainer.dataset.state === "state-right") {
    carouselItemShampoo.classList.remove("carousel-item-middle");
    carouselItemShampoo.classList.add("carousel-item-right");
    carouselItemMain.classList.remove("carousel-item-left");
    carouselItemMain.classList.add("carousel-item-middle");
    carouselItemShoes.classList.remove("carousel-item-right");
    carouselItemShoes.classList.add("carousel-item-left");
    carouselContainer.dataset.state = "state-start";
  }
});

/* Same as above */
directionalButtonRight.addEventListener("click", () => {
  if (carouselContainer.dataset.state === "state-start") {
    carouselItemMain.classList.remove("carousel-item-middle");
    carouselItemMain.classList.add("carousel-item-left");
    carouselItemShoes.classList.remove("carousel-item-left");
    carouselItemShoes.classList.add("carousel-item-right");
    carouselItemShampoo.classList.remove("carousel-item-right");
    carouselItemShampoo.classList.add("carousel-item-middle");
    carouselContainer.dataset.state = "state-right";
  } else if (carouselContainer.dataset.state === "state-right") {
    carouselItemShampoo.classList.remove("carousel-item-middle");
    carouselItemShampoo.classList.add("carousel-item-left");
    carouselItemMain.classList.remove("carousel-item-left");
    carouselItemMain.classList.add("carousel-item-right");
    carouselItemShoes.classList.remove("carousel-item-right");
    carouselItemShoes.classList.add("carousel-item-middle");
    carouselContainer.dataset.state = "state-left";
  } else if (carouselContainer.dataset.state === "state-left") {
    carouselItemShoes.classList.remove("carousel-item-middle");
    carouselItemShoes.classList.add("carousel-item-left");
    carouselItemShampoo.classList.remove("carousel-item-left");
    carouselItemShampoo.classList.add("carousel-item-right");
    carouselItemMain.classList.remove("carousel-item-right");
    carouselItemMain.classList.add("carousel-item-middle");
    carouselContainer.dataset.state = "state-start";
  }
});

const fetchedCart = localStorage.getItem("cart");
const apiToken = sessionStorage.getItem("apiToken");
importsFunctions1.colorToIcons(fetchedCart, apiToken);
importsFunctions1.mobileDropdownMenu();
carouselCTAS();
productAnchors();

carouselProduct(carouselItemShampoo, organicShampoo);
carouselProduct(carouselItemShoes, whiteSneakers);

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
