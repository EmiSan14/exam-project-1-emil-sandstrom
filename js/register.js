"use strict";

import * as importsFunctions1 from "./functions-1.js";

const apiEndPoint = "https://v2.api.noroff.dev/auth/register";
const apiKey = "${{ secrets.APIKEY }}";

const usernameInput = document.getElementById("username-register-page");
const emailInput = document.getElementById("email-register-page");
const passwordInput = document.getElementById("password-register-page");
const passwordRepeatInput = document.getElementById(
  "password-register-page-repeat",
);
const registerSubmitButton = document.getElementById("register-submit");
const registerToastDiv = document.querySelector(".register-toast-div");
const errorMessageDiv = document.querySelector(".error-message-div");
const errorMessageText = errorMessageDiv.firstElementChild;
const errorMessageButton = errorMessageDiv.lastElementChild;

function hideToast() {
  registerToastDiv.classList.add("hidden");
}

function successfulRegister() {
  registerToastDiv.classList.remove("hidden");
  setTimeout(hideToast, 3000);
}

function errorMessageShow(errorMessage) {
  errorMessageDiv.classList.remove("hidden");
  errorMessageText.textContent = errorMessage;
}

/* Checks if both passwords are the same, then sends info from form to API */
async function registerAttempt(noroffRegisterEndPoint) {
  const spinner = document.querySelector(".spinner");
  spinner.classList.remove("hidden");
  const usernameValue = usernameInput.value;
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  const passwordRepeatValue = passwordRepeatInput.value;
  if (passwordValue !== passwordRepeatValue) {
    errorMessageDiv.classList.remove("hidden");
    errorMessageText.textContent = "Both passwords must match";
  }
  const loginCredentials = {
    name: usernameValue,
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
    const response = await fetch(noroffRegisterEndPoint, options);
    const result = await response.json();
    return result;
  } catch (error) {
    errorMessageText.textContent = error.message;
    errorMessageDismiss();
  } finally {
    const spinner = document.querySelector(".spinner");
    spinner.classList.add("hidden");
  }
}

/* Shows API-error info on screen if wrong, 
otherwise positive feedback to signify completion */
registerSubmitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  // Send input-data to Noroff register through POST-request
  const registerAttempted = await registerAttempt(apiEndPoint);
  if (registerAttempted.statusCode === 400) {
    errorMessageShow(registerAttempted.errors[0].message);
  } else {
    // Toast message for success
    successfulRegister();
  }
});

errorMessageButton.addEventListener("click", () => {
  errorMessageDiv.classList.add("hidden");
});

const fetchedApiToken = sessionStorage.getItem("apiToken");
importsFunctions1.mobileDropdownMenu();
importsFunctions1.colorToIcons(fetchedApiToken);
