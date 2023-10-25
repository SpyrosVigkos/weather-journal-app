class FetchWrapper {
  constructor(baseURL) {
    console.log(baseURL);
    this.baseURL = baseURL;
  }

  // GET Info from Api using async function
  async get(endpoint) {
    const finalUrl = this.baseURL + endpoint;
    const fetchedData = await fetch(finalUrl, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain",
      },
      redirect: "follow",
    }).then((res) => res.json());
    console.log("get fetched data:", fetchedData);
    return fetchedData;
  }

  // Async POST to server the landed information from API
  async post(url = "", weatherData = {}) {
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
  }
  // Put
  async put(url = "", data = {}) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      const updatedData = await response.json();
      return updatedData;
    } catch (error) {
      console.log("error", error);
    }
  }

  //DELETE Request:
  async delete(url = "") {
    const response = await fetch(url, {
      method: "DELETE",
    });

    try {
      const deletedData = await response.json();
      return deletedData;
    } catch (error) {
      console.log("error", error);
    }
  }

  //PATCH Request:
  async patch(url = "", data = {}) {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      const patchedData = await response.json();
      return patchedData;
    } catch (error) {
      console.log("error", error);
    }
  }
}

/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&units=metric&appid=5e4f82763a96a8e83e0533f967cd7193";
// Gernerate Button
const generate = document.getElementById("generate");
console.log("hello!");
const WeatherData = new FetchWrapper(baseUrl);

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getDate() + "." + date.getMonth() + "." + date.getFullYear();

//add event listener to "Generate" button to GET API details
generate.addEventListener("click", genFunction);

//Async function to get the inputs and call the api data
function genFunction() {
  const zip = document.getElementById("zip").value;
  const feeling = document.getElementById("feelings").value;
  const apiUrlEndPoint = zip + apiKey;
  WeatherData.get(apiUrlEndPoint)
    .then((weatherData) => {
      console.log(weatherData);
      WeatherData.post("/", {
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
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
    document.getElementById(
      "content"
    ).innerHTML = `${data.feelings} and the weather is ${data.description} condition: ${data.icon}`;
  } catch (error) {
    console.log("error", error);
  }
};
