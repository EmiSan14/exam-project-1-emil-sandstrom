"use strict";

// POST /auth/login

const apiEndPoint = "https://v2.api.noroff.dev/auth/register";
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRW1pU2FuMTQiLCJlbWFpbCI6ImVtaXNhbjA2OTUyQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzg3MDYxMDg1fQ.I-xBOnR8r2dQa2fEbkPyHiV9g9zl8bPOekJ2aErFIYM";
const apiKey = "${{ secrets.APIKEY }}";

const emailInput = document.getElementById("email-register-page");
const passwordInput = document.getElementById("password-register-page");
const passwordRepeatInput = document.getElementById(
  "password-register-page-repeat",
);
const loginSubmitButton = document.getElementById("register-submit");
const loginToastDiv = document.querySelector(".register-toast-div");

function hideToast() {
  registerToastDiv.classList.add("hidden");
}

function successfulRegister() {
  registerToastDiv.classList.remove("hidden");
  registerToastDiv.setTimeout(hideToast, 3000);
}

registerSubmitButton.addEventListener("click", () => {
  // Send input-data to Noroff register through POST-request
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  const passwordRepeatValue = passwordRepeatInput.value;

  // Toast message for success
  successfulRegister();
});
