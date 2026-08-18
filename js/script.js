const apiEndPoint = "https://v2.api.noroff.dev/online-shop";
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRW1pU2FuMTQiLCJlbWFpbCI6ImVtaXNhbjA2OTUyQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzg3MDYxMDg1fQ.I-xBOnR8r2dQa2fEbkPyHiV9g9zl8bPOekJ2aErFIYM";
const apiKey = "a5ba07c0-eb05-49a7-be8d-877e497fb719";

async function getApi() {
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
  } catch (error) {
    console.log(error);
  }
}

getApi();
