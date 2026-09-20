"use strict";

// POST /auth/login

const apiEndPoint = "https://v2.api.noroff.dev/auth/login";
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
  loginToastDiv.setTimeout(hideToast, 3000);
}

loginSubmitButton.addEventListener("click", () => {
  // Send input-data to Noroff login through POST-request
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  // If successful - Take received token and add it to storage
  const receivedToken = // API-result
    sessionStorage.setItem("apiToken", receivedToken);

  // Toast message for success
  successfulLogin();
});
