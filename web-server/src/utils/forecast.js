const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const baseURL = "http://api.weatherstack.com/";
  const token = "d69ebc1ea9d6e5452b76cc3f69ae6b8c";
  const query = `${latitude},${longitude}`;
  const url = `${baseURL}/current?access_key=${token}&query=${query}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " - It is currently " +
          body.current.temperature +
          " degress out. There is a " +
          body.current.wind_speed +
          " wind speed"
      );
    }
  });
};

module.exports = forecast;
