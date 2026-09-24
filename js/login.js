"use strict";

import * as importsFunctions1 from "./functions-1.js";

// POST /auth/login

const noroffEndPoint = "https://v2.api.noroff.dev/auth/login";
const apiKey = "${{ secrets.APIKEY }}";

const emailInput = document.getElementById("email-login-page");
const passwordInput = document.getElementById("password-login-page");
const loginSubmitButton = document.getElementById("login-submit");
const loginToastDiv = document.querySelector(".login-toast-div");
const errorMessageDiv = document.querySelector(".error-message-div");
const errorMessageText = errorMessageDiv.firstElementChild;
const errorMessageButton = errorMessageDiv.lastElementChild;

function hideToast() {
  loginToastDiv.classList.add("hidden");
}

function successfulLogin() {
  loginToastDiv.classList.remove("hidden");
  setTimeout(hideToast, 3000);
}

/* Showing info from API on screen if non-valid */
function errorMessageShow(errorMessage) {
  errorMessageDiv.classList.remove("hidden");
  errorMessageText.textContent = errorMessage;
}

/* Data sent from page to API where login happens
and getting back the API-token to be used as validator for 
being able to add items to cart and signify being logged in */
async function loginAttempt(noroffLoginEndPoint) {
  const spinner = document.querySelector(".spinner");
  spinner.classList.remove("hidden");
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  const loginCredentials = {
    email: emailValue,
    password: passwordValue,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(loginCredentials),
  };
  try {
    const response = await fetch(noroffLoginEndPoint, options);
    const result = await response.json();
    return result.data.accessToken;
  } catch (error) {
    errorMessageShow(error.message);
  } finally {
    const spinner = document.querySelector(".spinner");
    spinner.classList.add("hidden");
  }
}

/* Adding both API-token for being logged in 
and email for final summary-screen */
loginSubmitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  // Send input-data to Noroff login through POST-request
  const receivedToken = await loginAttempt(noroffEndPoint);
  if (!receivedToken) {
    errorMessageDiv.classList.remove("hidden");
  } else {
    // If successful - Take received token and add it to storage
    sessionStorage.setItem("apiToken", receivedToken);
    sessionStorage.setItem("email", emailInput.value);

    // Toast message for success
    successfulLogin();
    emailInput.value = "";
    passwordInput.value = "";
  }
});

errorMessageButton.addEventListener("click", () => {
  errorMessageDiv.classList.add("hidden");
});

const fetchedApiToken = sessionStorage.getItem("apiToken");
importsFunctions1.mobileDropdownMenu();
importsFunctions1.colorToIcons(fetchedApiToken);
