const express = require("express");
const app = express();

app.use(express.json());

app.use("/API/v1/auth", require("./../API/routes/user"));
app.use("/API/v1/trips", require("./../API/routes/trip"));
app.use("/API/v1/bookings", require("./../API/routes/bookings"));

module.exports = app;