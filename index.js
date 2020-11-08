const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const port = process.env.PORT || 3001;
const battlesRouter = require("./routes/battles");

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/battles", battlesRouter);

app.listen(port, function() {
  console.log("Running backend on " + port);
});

module.exports = app;
