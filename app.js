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
    db.InsertMeasurements(req.body.userId, req.body.reading, req.body.measurementType, req.body.date).then(data=>{
        res.send("Success Updated");
    });
});

app.get("/patient/:id", function (req, res) {
    getUserById(req.params.id).then(data=>{
        res.render("patient", {userData: data});
    })
})

app.get("/gp/:id", function (req, res) {
    getUserById(req.params.id).then(data=>{
        res.render("gppage", {userData: data});
    })
})

app.put("/update/:id", function (req, res) {
    var userid = req.params.id;

    var height;
    var weight;
    var gp;

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

    if(req.body.selectedGP === undefined){
        gp = 0;
    }
    else {
        gp = req.body.selectedGP;
    }

    db.UpdateProfile(userid, req.body.emailAddress, req.body.fName, gp,req.body.address,
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

app.get("/singlePatient/:id/:gpId", function (req, res) {
    var userid = req.params.id;
    getUserById(userid).then(data =>{
        res.render("singlepatient", {userData : data, gpId : req.params.gpId});
    })
})

async function getUserById(userid){
    let data = await db.SelectAccountByID(userid);
    var json = JSON.stringify(data);
    return JSON.parse(json);
}

async function syncDataFromFitBit(userId, reading, type, time){
    let data = await db.InsertMeasurementFromFitBit(userId, reading,type, time);
}

// redirect the user to the Fitbit authorization page
app.get("/authorize/:id", (req, res) => {
    // request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
    res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'https://young-journey-50996.herokuapp.com/callback/', "", req.params.id));
});

// handle the callback from the Fitbit authorization flow
app.get("/callback", (req, res) => {

    var userId = req.query.state

    // exchange the authorization code we just received for an access token
    client.getAccessToken(req.query.code, 'https://young-journey-50996.herokuapp.com/callback/').then(result => {
        // use the access token to fetch the user's profile information

        var endDate = new Date().toISOString().slice(0,10);
        var fitbitCalories;
        var fitbitBurnt;
        db.SelectLatestMeasurementDateByID(userId, "Calories Intake").then(data=>{
            var json = JSON.stringify(data);
            var time = JSON.parse(json);

            var date = new Date();
            date.setDate(date.getDate()-29);

            if(Object.keys(time).length > 0){

                var d = new Date(time[0].timeStamp);
                if(date < d){
                    date = d;
                }
            }

            var path = "/activities/calories/date/" + date.toISOString().slice(0,10) + "/" + endDate + ".json";

             fitbitCalories = client.get(path, result.access_token).then(results => {
                fitbitCalories = Object.values(results[0])[0];
            })
        }).then(data=>{
            db.SelectLatestMeasurementDateByID(userId,"Calories Burnt").then(data=>{
                var json = JSON.stringify(data);
                var time = JSON.parse(json);

                var date = new Date();
                date.setDate(date.getDate()-30);

                if(Object.keys(time).length > 0){
                    var d = new Date(time[0].timeStamp);
                    if(date < d){
                        date = d;
                    }
                }

                var path = "/activities/activityCalories/date/" + date.toISOString().slice(0,10) + "/" + endDate + ".json";

                 fitbitBurnt = client.get(path, result.access_token).then(results => {
                    fitbitBurnt = Object.values(results[0])[0];
                     [...Array(fitbitCalories.length)].reduce( (p, _, i) =>
                             p.then(_ => syncDataFromFitBit(userId,fitbitCalories[i].value,'Calories Intake', fitbitCalories[i].dateTime))
                         , Promise.resolve()).then(data=>{
                         [...Array(fitbitBurnt.length)].reduce( (p, _, i) =>
                                 p.then(_ => syncDataFromFitBit(userId,fitbitBurnt[i].value,'Calories Burnt', fitbitBurnt[i].dateTime))
                             , Promise.resolve()).then(data=>{
                             getUserById(userId).then(data=>{
                                 if(data[0].role === "GP"){
                                     res.render("gppage", { userData: data});
                                 }
                                 else {
                                     res.render("patient", { userData: data});
                                 }
                             })
                         })
                         }
                     );
                })
            })
        });

        // db.SelectLatestMeasurementDateByID(userId, "Calories Intake").then(data =>{
        //     var json = JSON.stringify(data);
        //     var time = JSON.parse(json);
        //
        //     var date = new Date();
        //     date.setDate(date.getDate()-29);
        //
        //     if(Object.keys(time).length > 0){
        //
        //         var d = new Date(time[0].timeStamp);
        //         if(date < d){
        //             date = d;
        //         }
        //     }
        //
        //     var path = "/activities/calories/date/" + date.toISOString().slice(0,10) + "/" + endDate + ".json";
        //
        //     var fitbitCalories = client.get(path, result.access_token).then(results => {
        //         fitbitCalories = Object.values(results[0])[0];
        //     }).then(data=>{
        //
        //         [...Array(fitbitCalories.length)].reduce( (p, _, i) =>
        //                 p.then(_ => syncDataFromFitBit(userId,fitbitCalories[i].value,'Calories Intake', fitbitCalories[i].dateTime))
        //             , Promise.resolve());
        //
        //         // for (let i = 0, p = Promise.resolve(); i < fitbitCalories.length; i++) {
        //         //     p = p.then(_ => syncDataFromFitBit(userId,fitbitCalories[i].value,'Calories Intake', fitbitCalories[i].dateTime));
        //         // }
        //     }).then(
        //         data=>{
        //             db.SelectLatestMeasurementDateByID(userId, "Calories Burnt").then(data =>{
        //                 var json = JSON.stringify(data);
        //                 var time = JSON.parse(json);
        //
        //                 var date = new Date();
        //                 date.setDate(date.getDate()-30);
        //
        //                 if(Object.keys(time).length > 0){
        //                     var d = new Date(time[0].timeStamp);
        //                     if(date < d){
        //                         date = d;
        //                     }
        //                 }
        //
        //                 var path = "/activities/activityCalories/date/" + date.toISOString().slice(0,10) + "/" + endDate + ".json";
        //
        //                 var fitbitBurnt = client.get(path, result.access_token).then(results => {
        //                     fitbitBurnt = Object.values(results[0])[0];
        //                 }).then(data=>{
        //                     [...Array(fitbitBurnt.length)].reduce( (p, _, i) =>
        //                             p.then(_ => syncDataFromFitBit(userId,fitbitBurnt[i].value,'Calories Burnt', fitbitBurnt[i].dateTime))
        //                         , Promise.resolve());
        //                     // for (let i = 0, p = Promise.resolve(); i < fitbitBurnt.length; i++) {
        //                     //     p = p.then(_ => db.InsertRoles(userId,fitbitBurnt[i].value,'Calories Burnt', fitbitBurnt[i].dateTime));
        //                     // }
        //                 }).then(data=>{
        //                     getUserById(userId).then(data=>{
        //                         if(data[0].role === "GP"){
        //                             res.render("gppage", { userData: data});
        //                         }
        //                         else {
        //                             res.render("patient", { userData: data});
        //                         }
        //                     })
        //                 });
        //             })
        //         }
        //     );
        // });
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