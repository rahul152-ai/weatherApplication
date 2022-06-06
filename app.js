require('dotenv').config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { request } = require("http");
const { response } = require("express");

const ejs=require("ejs");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render("index",{temp:null,location:"bhopal",country:"IN",date:new Date(),Max_temp:45,Min_temp:34,image:null,des:null});
});

app.post("/", (req, res) => {
  const city = req.body.cityName;
  const link = process.env.FRISTPART+city+process.env.SECONDPART;
    // "https://api.openweathermap.org/data/2.5/weather?q=" +
    // city +
    // "&appid=cebbc5972898e06ab0a16f78b1ea6575&units=metric";
  https.get(link, (response) => {
    response.on("data", (data) => {  
      var weathers = JSON.parse(data);
      var temperature = weathers.main.temp;
      var descriptions = weathers.weather[0].description;
      var icon = weathers.weather[0].icon;
      var iconUrl = `http://openweathermap.org/img/wn/` + icon + `@2x.png`;
      var Location= weathers.name;
      let Country=weathers.sys.country;
      let MIN=weathers.main.temp_min;
      let MAX=weathers.main.temp_max;
      

      res.render("index",{temp:temperature,location:Location,country:Country,date:new Date(),Max_temp:MAX,Min_temp:MIN,image:iconUrl,des:descriptions});
      
    
    });
  });
});

app.listen(3000, () => {
  console.log("this application is running on port 3000");
});
