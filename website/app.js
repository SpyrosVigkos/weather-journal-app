/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&units=metric&appid=5e4f82763a96a8e83e0533f967cd7193";
// Gernerate Button
const generate = document.getElementById("generate");

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getMonth() + "." + date.getDate() + "." + date.getFullYear();

// GET Info from Api using async function and
const getWeatherData = async (url) => {
  const request = await fetch(url);
  console.log(request);
  try {
    const weatherData = await request.json();
    console.log("weather data: ", weatherData);
    return weatherData;
  } catch (error) {
    console.log("error", error);
  }
};

// Async POST to server the landed information from API
const postData = async (url = "", weatherData = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(weatherData),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//add event listener to "Generate" button to GET API details
generate.addEventListener("click", genFunction);

//Async function to get the inputs and call the api data
async function genFunction() {
  zip = document.getElementById("zip").value;
  const feeling = document.getElementById("feelings").value;
  const apiUrl = baseUrl + zip + apiKey;
  getWeatherData(apiUrl)
    .then((weatherData) => {
      postData("/", {
        temperature: weatherData.main.temp,
        date: newDate,
        feelings: feeling,
      });
    })
    .then(() => {
      updateUI();
    });
}

// Update UI Dynamically
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const data = await request.json();
    document.getElementById("date").innerHTML = data.date;
    document.getElementById("temp").innerHTML = `${data.temperature} &#8451;`;
    document.getElementById("content").innerHTML = data.feelings;
  } catch (error) {
    console.log("error", error);
  }
};
