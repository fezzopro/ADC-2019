const Express = require("express");
const app = Express();

app.route('/auth/signin')
    .post((request, response)=>{
        response.sendFile('index.html', {root: `${__dirname}/views`})
    })

app.route('/auth/signup')
    .post((request, response)=>{

    })

app.route('/trips')
    // Get All Trips
    .get((request, response)=>{
        
    })
    //Get A specific Trip
    .get('/trips/<:trip-id>',(request, response)=>{
        
    })
    //Create A Trip
    .post((request, response)=>{
        
    })
    //Cancel A Specific Trip
    .patch('/trips/<:trip-id>/cancel',(request, response)=>{
        
    })

app.route('/bookings')
    .get((request, response)=>{
        
    })
    .delete('/bookings/<:booking-id>',(request, response)=>{
        
    })
    .post((request, response)=>{
        
    })
    .patch('/trips/<:trip-id>/cancel',(request, response)=>{
        
    })

exports.app;