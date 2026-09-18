export function checkPrices(standardPrice, discountedPrice) {
  if (standardPrice.textContent === discountedPrice.textContent) {
    standardPrice.remove();
  } else {
    standardPrice.classList.add("price-line-through");
  }
}

export function addID(linkingElement, specificAPIProduct) {
  linkingElement.dataset.buttonid = specificAPIProduct.id;
}

export function addProductIDToStorage(anchor) {
  const idToAdd = anchor.dataset.buttonid;
  sessionStorage.removeItem("clickedProductID");
  sessionStorage.setItem("clickedProductID", `${idToAdd}`);
}

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
  const emptyStar1 = document.createElement("p");
  emptyStar1.textContent = "\u2606";
  const emptyStar2 = document.createElement("p");
  emptyStar2.textContent = "\u2606";
  const emptyStar3 = document.createElement("p");
  emptyStar3.textContent = "\u2606";
  const emptyStar4 = document.createElement("p");
  emptyStar4.textContent = "\u2606";
  const emptyStar5 = document.createElement("p");
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

export function errorMessageDismiss() {
  const errorMessageButton = document.querySelector(".error-message-button");
  errorMessageButton.addEventListener("click", () => {
    console.log(errorMessageButton);
    const errorMessageDiv = document.querySelector(".error-message-div");
    errorMessageDiv.classList.add("hidden");
  });
}
