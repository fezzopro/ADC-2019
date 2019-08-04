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
}

module.exports = new RequestBodies();