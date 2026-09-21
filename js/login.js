"use strict";

// POST /auth/login

const noroffEndPoint = "https://v2.api.noroff.dev/auth/login";
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRW1pU2FuMTQiLCJlbWFpbCI6ImVtaXNhbjA2OTUyQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzg3MDYxMDg1fQ.I-xBOnR8r2dQa2fEbkPyHiV9g9zl8bPOekJ2aErFIYM";
const apiKey = "${{ secrets.APIKEY }}";

const emailInput = document.getElementById("email-login-page");
const passwordInput = document.getElementById("password-login-page");
const loginSubmitButton = document.getElementById("login-submit");
const loginToastDiv = document.querySelector(".login-toast-div");

function hideToast() {
  loginToastDiv.classList.add("hidden");
}

function successfulLogin() {
  loginToastDiv.classList.remove("hidden");
  // loginToastDiv.setTimeout(hideToast, 3000);
}

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
    console.log(result.data);
    return result.data.accessToken;
  } catch (error) {
    const errorMessageDiv = document.querySelector("error-message-div");
    errorMessageDiv.classList.remove("hidden");
  } finally {
    const spinner = document.querySelector(".spinner");
    spinner.classList.add("hidden");
  }
}

async function loginSubmitFunctionality() {
  loginSubmitButton.addEventListener("click", (event) => {
    event.preventDefault();
    // Send input-data to Noroff login through POST-request
    const accessToken = await loginAttempt(noroffEndPoint);
    console.log(accessToken);

    // If successful - Take received token and add it to storage
    //const receivedToken = // API-result
    //  sessionStorage.setItem("apiToken", receivedToken);

    // Toast message for success
    successfulLogin();
  });   
}
