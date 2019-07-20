require("dotenv").config();
const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();
app.use(cors());

let config = {
  accessToken: process.env.ACCESS_TOKEN,
  port: process.env.PORT || 8000
};

app.use("/graphql", function(req, res) {
  let url = "https://api.yelp.com/v3/graphql";

  req
    .pipe(
      request({
        qs: req.query,
        uri: url,
        headers: { authorization: `Bearer ${config.accessToken}` }
      })
    )
    .pipe(res);
});

app.listen(config.port, () => {
  console.log(`Listening on port:${config.port}`);
});
