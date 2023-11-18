const express = require("express");
const axios = require("axios");
const app = express();



//set view engine to ejs
app.set("view engine", "ejs");

//serve the public folder as static file
app.use(express.static("public"));

//render the index template with default values for weather and error
app.get("/", (req, res) => {
    res.render("index", { weather: null, error: null});
});

// handle the /weather route
app.get("/weather", async(req, res) => 
{
    // get the city from the query parameters
    const city = req.query.city;
    const apiKey = `f1f0ac4b537a1d0aa58cf9c550839055`;

    // fetching weather data from the API
    const APIurl =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}` ;
    let weather;
    let error;
    try {
        const response = await axios.get(APIurl);
        weather = response.data;
    } catch (error) {
        weather = null;
        error = 'Error, Please try again';
    }

    // render the index template with the weather data and error
    res.render("index", { error,
     weather});
});

// starting the server and listen on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server running on port 3000");
});