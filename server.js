const express = require("express");
const path = require("path");
const app = require("./server/routes/routes");

// Make our html pages available for express to use available 
// By using express middleware
app.use('/assets',express.static(`${__dirname}/views`));
app.use(express.urlencoded());
app.use(express.json());


// Creating and points
app.get("/", (request, response, next) =>{
    // response.sendFile("index.html",{root: path.join(__dirname, './views')});
    response.send(response.statusCode);
});
app.get("/index", (request, response, next) =>{
    // response.sendFile("index.html",{root: path.join(__dirname, './views')});
});
app.get("/signin", (request, response, next) =>{
    // response.sendFile("index.html",{root: path.join(__dirname, './views')});
    response.send(response.statusCode);
});
app.get("/sign-up", (request, response, next) =>{
    response.send(response.statusCode);
    // response.sendFile("sign-up.html",{root: path.join(__dirname, './views')});
});
app.get("/home", (request, response, next) =>{
    response.send(response.statusCode);
    // response.sendFile("home.html",{root: path.join(__dirname, './views')});
});
app.get("/accountinfo", (request, response, next) =>{
    response.send(response.statusCode);
    // response.sendFile("accountinfo.html",{root: path.join(__dirname, './views')});
});
app.get("/allbooking", (request, response, next) =>{
    response.send(response.statusCode);
    // response.sendFile("allbooking.html",{root: path.join(__dirname, './views')});
});
// View all bookings
app.get("/booking", (request, response, next) =>{
    response.send(response.statusCode);
    // response.sendFile("booking.html",{root: path.join(__dirname, './views')});
});
app.get("/alltrips", (request, response, next) =>{
    response.send(response.statusCode);
    // response.sendFile("alltrips.html",{root: path.join(__dirname, './views')});
});
app.get("/createtrips", (request, response, next) =>{
    response.send(response.statusCode);
    // response.sendFile("createtrips.html",{root: path.join(__dirname, './views')});
});
app.get("/canceltrips", (request, response, next) =>{
    response.send(response.statusCode);
    // response.sendFile("canceltrips.html",{root: path.join(__dirname, './views')});
});
app.get("/documentations", (request, response, next) =>{

});
app.get("/logout/", (request, response, next) =>{
    response.send(response.statusCode);
    // response.sendFile("index.html",{root: path.join(__dirname, './views')});
});
// If till here we didn't handle the request
app.use((request, response, next)=>{
    let error = new Error('Not Found');
    error.status = 404;
    next(error);
    
})
// And we handle the previous error as well as other errors
app.use((error, request, response, next)=>{
    response.status(error.status || 500);
    response.json({
        status: response.statusCode,
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
});
