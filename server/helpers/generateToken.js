const jwt = require("jsonwebtoken");
let token = (dataResponse)=>{
    return jwt.sign(
    {
        names: dataResponse.data.first_name + ' ' + dataResponse.data.last_name,
        is_admin: dataResponse.data.is_admin,
        random_reference: dataResponse.random_reference,
        id: dataResponse.data.id
    },
    process.env.JWT_KEY,
    { expiresIn: "1h" });
}

module.exports = token;