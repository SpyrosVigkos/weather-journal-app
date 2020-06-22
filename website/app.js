/* Global Variables */
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=93ec3247177dbb56166d5141dcdca068';
const generate = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// GET Info from Api using async function and 

const getWeatherData = async (url) => {

    const request = await fetch(url);
    console.log(request);
    try{
        const weatherData = await request.json();
        console.log(weatherData);
    }
    catch(error){
        console.log("error", error)
    }
}

// Async POST to server the landed information from API 
const postData = async ( url = '', weatherData = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(weatherData), 
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

//add event listener to "Generate" button to GET API details 
generate.addEventListener('click', genFunction)

//Async function to get the input and call the api data
async function genFunction(){
    zip = document.getElementById("zip").value;
    const apiUrl = url + zip + apiKey;
    getWeatherData(apiUrl);
}