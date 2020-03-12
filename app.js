const express = require('express');
const app = express();
const  cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const  bodyParser = require('body-parser');
const databaseRoutes = require('./routes');
const _db = require('./database-driver');
const db = new _db();


//middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(session({cookie:{maxAge:null}}));
app.use('/api', databaseRoutes);
app.use(methodOverride("_method"));
//all our templates will be ejs
app.set("view engine","ejs");

// initialize the Fitbit API client
const FitbitApiClient = require("fitbit-node");
const client = new FitbitApiClient({
    clientId: "22BL9L",
    clientSecret: "38c1b3e81cc8e69a7e1715a062a79b99",
    apiVersion: '1.2' // 1.2 is the default
});

app.get("/", function (req, res) {
    res.render("login");
});

app.get("/signup", function (req, res) {
    res.render("signup");
});

app.post("/home", function (req, res) {

    var user = db.SelectAccountByUserAndPassword(req.body.username, req.body.password).then(data => {
        var data = JSON.stringify(data);

        user = JSON.parse(data);

    }).then(data => {
        if(user.length <= 0){
        console.log("wrong account or password");
        res.redirect("/")
    }

    else {

        if(user[0].role === "Patient"){
            res.render("patient", { userData: user});
        } else {
            res.render("gppage", { userData: user});
        }
        }
    });
});

app.post("/register", function (req, res) {

    var role = req.body.isGP;
    var gpId = req.body.gpID;

    if(role == "on"){
        role = "GP";
    }
    else {
        role = "Patient";
        gpId = 0;
    }

    db.SelectAccountByUserOrGPID(req.body.username, gpId).then(data => {
        var data = JSON.stringify(data);

        var json = JSON.parse(data);

        if(json.length > 0){
            if(json[0].username === req.body.username){console.log("duplicate user");}
            else {
                console.log("duplicate GP");
            }
            res.redirect("/signup")
        } else {

            db.InsertAccount(req.body.username, req.body.password, role, req.body.gpID,
                req.body.fName, req.body.emailAddress, req.body.phone, req.body.birthday).then(data => {
                try {
                    res.redirect("/");
                } catch {
                    res.send('Unable to parse json');
                }
            });
        }
    });
});

app.post("/addMeasurement", function (req, res) {
    db.InsertMeasurements(req.body.userId, req.body.reading, req.body.measurementType, req.body.date).then(data =>{
        res.send("update success");
    });
})

app.put("/update/:id", function (req, res) {
    var userid = req.params.id;

    var height;
    var weight;

    if (req.body.height === undefined){
        height = 0;
    }else {
        height = req.body.height;
    }

    if (req.body.weight === undefined){
        weight = 0;
    }
    else {
        weight = req.body.weight;
    }

    db.UpdateProfile(userid, req.body.emailAddress, req.body.fName, req.body.selectedGP,req.body.address,
        req.body.phone, height, weight).then(
    ).then(
        data=>{
            getUserById(userid).then(data=>{
                if(data[0].role === "GP"){
                    res.render("gppage", { userData: data});
                }
                else {
                    res.render("patient", { userData: data});
                }
            });
        }
    )
});

async function getUserById(userid){
    let data = await db.SelectAccountByID(userid);
    var json = JSON.stringify(data);
    return JSON.parse(json);
}


// redirect the user to the Fitbit authorization page
app.get("/authorize", (req, res) => {
    // request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
    res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'http://localhost:3000/callback'));
});

// handle the callback from the Fitbit authorization flow
app.get("/callback", (req, res) => {
    // exchange the authorization code we just received for an access token
    client.getAccessToken(req.query.code, 'http://localhost:3000/callback').then(result => {
        // use the access token to fetch the user's profile information
        client.get("/activities/calories/date/2020-02-12/7d.json", result.access_token).then(results => {
           // res.send(results[0]);
            console.log(results);
            console.log(results[0]);
            res.redirect("/");
        }).catch(err => {
            res.status(err.status).send(err);
        });
    }).catch(err => {
        res.status(err.status).send(err);
    });
});

app.get("/logout", function (req, res) {
    req.session.authorized = false;
    req.session.access_token = null;
    req.session.save();
    res.redirect("/");
});


app.listen(process.env.PORT || 3000);


module.exports = app;