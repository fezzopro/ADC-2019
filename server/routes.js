const express = require("express");
const app = express();

app.use("/auth", require("./API/routes/user"));
app.use("/trips", require("./API/routes/trip"));
app.use("/bookings", require("./API/routes/bookings"));

module.exports = app;