import * as importsStart from "./script.js";

const product1 = document.getElementById("product-1");
const productName = product1.firstElementChild.nextElementSibling;
const productPrices = productName.nextElementSibling;
console.log(productPrices);

productPrices.forEach((price) => {
  if (price.classList.includes("product-start-number-standard")) {
    price.textContent = `${2000}:-`;
  } else if (price.classList.includes("product-start-number-discounted")) {
    price.textContent = `${400}:-`;
  }
});

console.log(productName);

function changeValue(oldValue, newValue) {
  oldValue.textContent = newValue;
}

changeValue(productName, "Poop");

importsStart.getApi();
