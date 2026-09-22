const apiEndPoint = "https://v2.api.noroff.dev/online-shop";
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRW1pU2FuMTQiLCJlbWFpbCI6ImVtaXNhbjA2OTUyQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzg3MDYxMDg1fQ.I-xBOnR8r2dQa2fEbkPyHiV9g9zl8bPOekJ2aErFIYM";
const apiKey = "${{ secrets.APIKEY }}";

export async function getApi(apiEndPoint) {
  const spinner = document.querySelector(".spinner");
  spinner.classList.remove("hidden");
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  };
  try {
    const response = await fetch(apiEndPoint, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    const errorMessageDiv = document.querySelector(".error-message-div");
    errorMessageDiv.classList.remove("hidden");
  } finally {
    const spinner = document.querySelector(".spinner");
    spinner.classList.add("hidden");
  }
}

export async function getSpecificApiProduct(apiEndPointSpecificProduct) {
  const spinner = document.querySelector(".spinner");
  spinner.classList.remove("hidden");
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  };
  try {
    const response = await fetch(apiEndPointSpecificProduct, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    const errorMessageDiv = document.querySelector(".error-message-div");
    errorMessageDiv.classList.remove("hidden");
  } finally {
    const spinner = document.querySelector(".spinner");
    spinner.classList.add("hidden");
  }
}
