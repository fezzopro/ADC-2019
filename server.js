const Express = require("express");
const WayFarer = require("./app");

const app = new Express();

// Creating and points
app.get("/", (request, response) =>{
    response.status(200).send("./index.html");
    
});
// Starting the server
const server = app.listen(5000, () =>{
    console.log(`Listening on port ${server.address().port}...`);
});