const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const express = require("express");

const app = express();

app.get("", (req, res, next) => {
  res.send("Hello express!");
});

app.get("/help", (req, res, next) => {
  res.json([{ name: "help" }, { name: "help you" }]);
});

app.get("/about", (req, res, next) => {
  res.send("about");
});

app.get("/weather", (req, res, next) => {
  if (!req.query.address) {
    return res.status(400).json({
      error: "You must provide a location",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location }) => {
    if (error) {
      return res.status(400).json({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.status(400).send({ error });
      }
      res.json({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res, next) => {
  res.json({ producdts: [req.query] });
});

//---------------------------------------------------------------

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
