const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const WayFarer = require("./server/wayfarer");
const app = require("./server/routes");

//Make our html pages available for express to use available 
app.use('/assets',express.static(`${__dirname}/views`));
app.use(express.urlencoded());
app.use(express.json());


// Creating and points
app.get("/", (request, response, next) =>{
    response.sendFile("index.html",{root: path.join(__dirname, './views')});
});
app.get("/index", (request, response, next) =>{
    response.sendFile("index.html",{root: path.join(__dirname, './views')});
});
app.get("/signin", (request, response, next) =>{
    response.sendFile("index.html",{root: path.join(__dirname, './views')});
});
app.get("/sign-up", (request, response, next) =>{
    response.sendFile("sign-up.html",{root: path.join(__dirname, './views')});
});
app.get("/home", (request, response, next) =>{
    response.sendFile("home.html",{root: path.join(__dirname, './views')});
});
app.get("/accountinfo", (request, response, next) =>{
    response.sendFile("accountinfo.html",{root: path.join(__dirname, './views')});
});
app.get("/allbooking", (request, response, next) =>{
    response.sendFile("allbooking.html",{root: path.join(__dirname, './views')});
});
// View all bookings
app.get("/bookings", (request, response, next) =>{
    response.sendFile("booking.html",{root: path.join(__dirname, './views')});
});
app.get("/createtrips", (request, response, next) =>{
    response.sendFile("createtrips.html",{root: path.join(__dirname, './views')});
});
app.get("/canceltrips", (request, response, next) =>{
    response.sendFile("canceltrips.html",{root: path.join(__dirname, './views')});
});
app.get("/documentations", (request, response, next) =>{

});
app.get("/logout/", (request, response, next) =>{
    response.sendFile("index.html",{root: path.join(__dirname, './views')});
});
// If till here we didn't handle the request
app.use((request, response, next)=>{
    let error = new Error('Not Found');
    error.status = 404;
    
})
app.use((error, request, response, next)=>{
    response.status(error.status || 500);
    response.json({
        error:{
            message: error.message
        }
    });
    
});
// Create a port
const port = process.env.PORT || 8000;
// Starting the server on port 8000
const server = app.listen(port, () =>{
    console.log(`Listening on port ${server.address().port}...`);
    // console.log(__dirname, __filename);
});