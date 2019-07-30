const Express = require("express");
const WayFarer = require("./server/app");

const app = new Express();

// Creating and points
app.get("/", (request, response) =>{
    response.status(200).send("./index.html");
});
app.get("/index", (request, response) =>{

});
app.get("/signin", (request, response) =>{

});
app.get("/sign-up", (request, response) =>{

});
app.get("/home", (request, response) =>{

});
app.get("/accountinfo", (request, response) =>{

});
app.get("/allbooking", (request, response) =>{

});
app.get("/booking", (request, response) =>{

});
app.get("/createtrips", (request, response) =>{

});
app.get("/canceltrips", (request, response) =>{

});
app.get("/alltrips", (request, response) =>{

});
app.get("/documentations", (request, response) =>{

});
app.get("/logout", (request, response) =>{

});
// Starting the server
const server = app.listen(5000, () =>{
    console.log(`Listening on port ${server.address().port}...`);
});