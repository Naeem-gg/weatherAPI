const express = require("express");
const app = express();
app.use(express.urlencoded({extended:true}));
const https = require("https");
app.get("/",function(req,res){
  res.sendFile(__dirname+"/enterCity.html");  
});

app.post("/",function (req,res) {  
  const city = req.body.city;
  const apiKey ="79911f7d3cfe66b869e6b2589f7eb307";
  const unit = "metric";
  let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit;
  
  https.get(url,function (response) {  
    // console.log(response);
    response.on("data",function(data){
      let forecast = JSON.parse(data);
      console.log(forecast);
      let long = forecast.coord.lon;
      let lat = forecast.coord.lat;
      let mainWeather = forecast.weather[0].main;
      let temp = forecast.main.temp;
      let iconCode = forecast.weather[0].icon;
      let icon = "https://openweathermap.org/img/wn/" +iconCode+ "@2x.png"
      res.write("<h1>Weather details</h1>");
      res.write("<img src="+icon+" alt='weather Icon '>");
      res.write("<p>lon: "+long+" lat: "+lat+"</p>");
      res.write("<p>Weather: "+mainWeather+"</p>");
      res.write("<p>temperature: "+temp+"</p>");
      res.write("<h3>~By Naeem~</h3>");
      res.send();
    });
  });
});
let port = 3000
app.listen(port,function(){
  console.log("express server is running well at port: "+ port);
});