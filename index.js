const https = require("https");
const express = require("express");
const { response } = require("express");
const app = express();
app.use(express.urlencoded({extended:true}))
app.get("/", (req, res) => {
  
     
    res.sendFile(`${__dirname}/enterCity.html`)
    });

  
    app.post("/",function (req,res) {

        let url =
    "https://api.openweathermap.org/data/2.5/weather?q=malegaon&appid=79911f7d3cfe66b869e6b2589f7eb307&units=metric";
  https.get(url, (response) => {
    // console.log(response);
    response.on("data", (data) => {
      // console.log(data)
      let weatherData = JSON.parse(data);
      let mainWeather = weatherData.weather[0].main;
      let w_desc = weatherData.weather[0].description;
      let temp = weatherData.main.temp;
      
      let cityName = req.body.city;
      // console.log(cityName);
      res.send(`<h1>Weather Details:</h1><br><strong>By Naeem</strong><p></p>city name = ${cityName} <br> weather = ${mainWeather}<br> description = ${w_desc}<br> Temperature = ${temp}`);
    });
});

});
app.listen(3000, () => {
  console.log("express server is running great! with nodemon");
});
