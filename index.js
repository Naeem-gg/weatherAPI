const { urlencoded } = require("express");
const express = require("express");
const app = express();
const https = require("https")
app.use(urlencoded({extended:true}));

app.get("/",function (req,res) {

    res.sendFile(__dirname+"/enterCity.html");
  });

app.post("/",function(req,res){
  const city = req.body.city;
  const apiKey = "79911f7d3cfe66b869e6b2589f7eb307"; 
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ apiKey +"&units="+ units;
  console.log(url);
  https.get(url,function(response){
    
    response.on("data",function(data){
      
      const weatherData = JSON.parse(data);
      const mainWeather = weatherData.weather[0].main;
      
      const desc = weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      const windSpeed = weatherData.wind.speed;
      const windDegree = weatherData.wind.deg;
      const country = weatherData.sys.country;
      const name = weatherData.name;
      const long = weatherData.coord.lon;
      const lat = weatherData.coord.lat;
      

      res.write("<h1>"+ city +"</h1><p>"+ mainWeather+ "....."+ desc +"......"+ temp+ "....."+ windSpeed +"</p>")
      
    });
  });
});

app.listen(3000,()=>{
  console.log("server is running at port 3000");
});
