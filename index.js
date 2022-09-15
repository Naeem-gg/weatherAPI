const https = require("https");
const express = require("express");
const { response } = require("express");
const app = express();

app.get("/",(req,res)=>{
    let url = "https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=79911f7d3cfe66b869e6b2589f7eb307&units=metric";
    https.get(url,(response)=>{
        console.log(response.statusCode);
    })
    res.send("Server is running great man at <a href='/'target=_blank>localhost:3000</a>");
})


app.listen(3000,()=> {

    console.log("express server is running great! with nodemon");
    
})