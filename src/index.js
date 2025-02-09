import "./styles.css";

const errorDiv = document.querySelector(".error");

// asynchronous function to fetch the current weather from Visual Crossing's API
async function getCurrentWeather(location) {
  try {
    const response = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&contentType=json&unitGroup=us&locationMode=single&key=YEEAHTYRSA4DRD8TUNBZ4M838&locations=" +
        location,
      { mode: "cors" },
    );
    const locationData = (await response.json()).location;
    const appObject = createAppObject(locationData);
    displayWeather(appObject);
  } catch (error) {
    errorDiv.innerHTML = "No matching location found.";
    console.log("No matching location found.");
  }
}

// Visually display the weather based on the data inside the filtered dataset
function displayWeather(appObject) {
  const iconDiv = document.querySelector(".icon");
  let iconString =
    appObject.icon.charAt(0).toUpperCase() + appObject.icon.slice(1);
  iconString = iconString.replaceAll("-", " ");
  iconDiv.innerHTML = iconString;

  const addressDiv = document.querySelector(".address");
  addressDiv.innerHTML = appObject.address;

  const tempDiv = document.querySelector(".temperature");
  tempDiv.innerHTML = appObject.temp + " °F";

  const precipDiv = document.querySelector(".precip");
  if (appObject.precip == null) {
    precipDiv.innerHTML = "Precipitation: Unknown";
  } else {
    precipDiv.innerHTML = "Precipitation: " + appObject.precip + " in.";
  }

  const wspdDiv = document.querySelector(".wspd");
  wspdDiv.innerHTML = "Wind Speed: " + appObject.wspd + " mph.";

  errorDiv.innerHTML = "";
}

// filters the json data and returns an object with only the data the app requires
function createAppObject(locationData) {
  return {
    address: locationData.address,
    icon: locationData.currentConditions.icon,
    temp: locationData.currentConditions.temp,
    precip: locationData.currentConditions.precip,
    wspd: locationData.currentConditions.wspd,
  };
}

const formDiv = document.querySelector("form");
const inputDiv = document.querySelector("input");

// form submitting logic
formDiv.addEventListener("submit", (event) => {
  event.preventDefault();
  getCurrentWeather(inputDiv.value);
  inputDiv.value = "";
});

// page loads with Boston, MA weather by default
getCurrentWeather("boston");
