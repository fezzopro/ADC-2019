class RequestBodies{
    constructor(){

    }

    checkSignUpBody(body){
        
        if (body.hasOwnProperty("username") && body.username !== '' &&
            body.hasOwnProperty("first_name") && body.first_name !== '' &&
            body.hasOwnProperty("last_name") && body.last_name !== '' &&
            body.hasOwnProperty("password") && body.password !== ''
            ) {
            return {status:true,data:""};
        }else{
            return {status:false, data: "Incorrest Inputs"};
        }
    }

    checkSignInBody(body){
        if (body.hasOwnProperty("username") && body.username !== '' &&
            body.hasOwnProperty("password") && body.password !== ''
        ) {
            return {status:true, data:""};
        }else{
            return {status:false, data:"incomplete entry. Please Enter All Required Informations"};
        }
    }

    checkCreateTripBody(body){
        if (body.hasOwnProperty("seats_capacity") && body.seats_capacity !== '' &&
            body.hasOwnProperty("bus_license_number") && body.bus_license_number !== '' &&
            body.hasOwnProperty("origin") && body.origin !== '' &&
            body.hasOwnProperty("destination") && body.destination !== '' &&
            body.hasOwnProperty("trip_date") && body.trip_date !== '' &&
            body.hasOwnProperty("fare") && body.fare !== '' 
            ) {
            return {status:true,data:""};
        }else{
            return {status:false, data:"incomplete entry. Please Enter All Required Informations"};
        }
    }
}

module.exports = new RequestBodies();