const express = require("express");
const app = express();
const homeController = require("./controllers/home-controller");
const authRoute = require("./routes/auth");
const pageNotFoundController = require("./controllers/page-not-found-controller");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "views");
app.use(authRoute);
const port = process.env.port || 3000;

app.get('/', homeController);
app.get('*', pageNotFoundController);

mongoose.connect(
    "mongodb://localhost:27017/myapp?retryWrites=true",
    { useNewUrlParser: true, useCreateIndex: true }
).then(() => {
    console.log('Database Connected!');
}).catch((err) => {
    console.log("Cannot Connect to Database!");
    console.log("err", err);
});

app.listen(port, function() {
    console.log("Listening on port", port);
})