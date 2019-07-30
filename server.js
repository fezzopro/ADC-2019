const Express = require("express");
const path = require("path");
const WayFarer = require("./server/app");

// const bodyParser = require("body-parser");

const app = new Express();

//Make our html pages available for express to use available 
app.use('/assets',Express.static(`${__dirname}/views`));
app.use(Express.urlencoded());
app.use(Express.json());


// Creating and points
app.get("/", (request, response) =>{
    response.sendFile("index.html",{root: path.join(__dirname, './views')});
});
app.post("/auth/signin", (request, response)=>{
    if (WayFarer.signin(request.body.username, request.body.password)) {
        response.send('greate');
        console.log(request.params);
        
    } else {
        response.send(request.params);
        console.log(request.params);
    }
    response.end();
})
app.post("/auth/signup",(request, response)=>{
    let user = {"userID": 5}
    if (request.body !=={}) {
        console.log(WayFarer.signup((request.body)));
    }
    response.send(request.body);

})
app.get("/index", (request, response) =>{
    response.sendFile("index.html",{root: path.join(__dirname, './views')});
});
app.get("/signin", (request, response) =>{
    response.sendFile("index.html",{root: path.join(__dirname, './views')});
});
app.get("/sign-up", (request, response) =>{
    response.sendFile("sign-up.html",{root: path.join(__dirname, './views')});
});
app.get("/home", (request, response) =>{
    response.sendFile("home.html",{root: path.join(__dirname, './views')});
});
app.get("/accountinfo", (request, response) =>{
    response.sendFile("accountinfo.html",{root: path.join(__dirname, './views')});
});
app.get("/allbooking", (request, response) =>{
    response.sendFile("allbooking.html",{root: path.join(__dirname, './views')});
});
app.post("/bookings",(request,response)=>{
    response.send('get it');
})
// View all bookings
app.get("/bookings", (request, response) =>{
    response.sendFile("booking.html",{root: path.join(__dirname, './views')});
});
// Delete a booking.
app.delete('/bookings/<:booking-id>',(request, response)=>{
        
})
app.get("/createtrips", (request, response) =>{
    response.sendFile("createtrips.html",{root: path.join(__dirname, './views')});
});
app.get("/canceltrips", (request, response) =>{
    response.sendFile("canceltrips.html",{root: path.join(__dirname, './views')});
});
//Create A Trip
app.post("/trips", (request, response)=>{
        
})
//Get All Trip;
app.get("/trips", (request, response) =>{
    response.sendFile("alltrips.html",{root: path.join(__dirname, './views')});
});
//Get A specific Trip
app.get('/trips/<:trip-id>',(request, response)=>{
    response.sendFile("alltrips.html",{root: path.join(__dirname, './views')});
})
//Cancel A Specific Trip
app.patch('/trips/<:trip-id>/cancel',(request, response)=>{
        
})
app.get("/documentations", (request, response) =>{

});
app.get("/logout/", (request, response) =>{
    response.sendFile("index.html",{root: path.join(__dirname, './views')});
});
// Starting the server on port 8000
const server = app.listen(8000, () =>{
    console.log(`Listening on port ${server.address().port}...`);
    // console.log(__dirname, __filename);
});