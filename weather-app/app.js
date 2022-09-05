const axios = require("axios");
console.log("Starting");
const baseURL = "http://api.weatherstack.com/";
const token = "d69ebc1ea9d6e5452b76cc3f69ae6b8c";

const getWeather = async (query) => {
  const data = await axios.get(
    `${baseURL}/current?access_key=${token}&query=${query}`
  );
  console.log(data.data.current);
};

getWeather("tel aviv");

console.log("Stopping");
