require("./config/database").connect();
const express = require("express");
const app = express();
var cors = require('cors');
const userApi = require("./routes/user");
const biddingApi = require("./routes/bidding");

app.use(express.json({ limit: "50mb" }));

app.use(cors());

app.use('/api',userApi);

app.use('/api/bidding',biddingApi);

app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "404 : Not found",
    },
  });
});

module.exports = app;
