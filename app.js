const express = require('express'),
    app = express();

app.use(express.static("public"));
//all our templates will be ejs
app.set("view engine","ejs");

app.get("/", function (req, res) {
    res.render("home");
});

app.listen(3000, function () {
    console.log("EHealth is runningnpm");
});