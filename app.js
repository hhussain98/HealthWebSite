
//include necessary components for website
const express = require('express');
const app = express();
var flash = require('connect-flash');
const  cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const databaseRoutes = require('./routes');
const _db = require('./database-driver');
const db = new _db();
const sgMail = require('@sendgrid/mail');

//middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(session({cookie:{maxAge:60000}}));
app.use(flash());
app.use('/api', databaseRoutes);
app.use(methodOverride("_method"));

app.use(function(req,res,next){
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next()
})



//all our templates will be ejs
app.set("view engine", "ejs");
sgMail.setApiKey("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");
// initialize the Fitbit API client
const FitbitApiClient = require("fitbit-node");
const client = new FitbitApiClient({
    clientId: "22BL9L",
    clientSecret: "38c1b3e81cc8e69a7e1715a062a79b99",
    apiVersion: '1.2' // 1.2 is the default
});

//render login page to front end
app.get("/", function (req, res) {
    res.render("login");
});

app.post("/sendEmail", function (req, res) {
    const msg = {
        to: req.body.emailTo,
        from: req.body.emailFrom,
        subject: req.body.subjectHeading,
        html: req.body.messageEmail,
    };
    sgMail.send(msg);
    res.send("Email has been sent")
});

//render page when user want to create account
app.get("/signup", function (req, res) {
    res.render("signup");
});

//Handle log in request
app.post("/home", function (req, res) {

    //check username and password exist
    //redirect to login page when user name and password no find
    var user = db.SelectAccountByUserAndPassword(req.body.username, req.body.password).then(data => {
        var data = JSON.stringify(data);

        user = JSON.parse(data);

    }).then(data => {
        if(user.length <= 0){
        console.log("wrong account or password");
        req.flash('error', "Login failed")
        res.redirect("/");
    }

    else {

            //render patient page if user's role is Patient
            if (user[0].role === "Patient") {
                req.flash('error', "Login success")
                res.render("patient", {message: req.flash('error'), userData: user});
            }
            //else render gp page to front end
            else {
                req.flash('error', "Login success")
                res.render("gppage", {userData: user});
            }
        }
    });
});

//Handle request of sign up new user
app.post("/register", function (req, res) {

    var role = req.body.isGP;
    var gpId = req.body.gpID;

    if (role == "on") {
        role = "GP";
    } else {
        role = "Patient";
        gpId = 0;
    }

    //check username is already exists or not
    db.SelectAccountByUserOrGPID(req.body.username, gpId).then(data => {
        var data = JSON.stringify(data);

        var json = JSON.parse(data);

        //redirect to sign up when username duplicate
        if(json.length > 0){
            if(json[0].username === req.body.username){
                console.log("duplicate user");
                req.flash("error", "Username Taken");
                res.redirect("/signup");
            }
            else {
                console.log("duplicate GP");
                req.flash("error", "GP number in use");
                res.redirect("/signup");
            }

        } else {

            //add new user account to database and redirect to log in page
            db.InsertAccount(req.body.username, req.body.password, role, req.body.gpID,
                req.body.fName, req.body.emailAddress, req.body.phone, req.body.birthday).then(data => {
                try {
                    req.flash('success', "Account Created!")
                    res.redirect("/");
                } catch {
                    res.send('Unable to parse json');
                }
            });
        }
    });
});

//Handle request of add new measurement data for patient
app.post("/addMeasurement", function (req, res) {
    db.InsertMeasurements(req.body.userId, req.body.reading, req.body.measurementType, req.body.date).then(data => {
        res.send("Success Updated");
    });
});

//render to patient page by id
app.get("/patient/:id", function (req, res) {
    getUserById(req.params.id).then(data => {
        res.render("patient", {userData: data});
    })
})

//render gp page by id
app.get("/gp/:id", function (req, res) {
    getUserById(req.params.id).then(data => {
        res.render("gppage", {userData: data});
    })
})


//Handle request of user update their profile
app.put("/update/:id", function (req, res) {
    var userid = req.params.id;

    var height;
    var weight;
    var gp;

    //check user give valid details
    if (req.body.height === undefined) {
        height = 0;
    } else {
        height = req.body.height;
    }

    if (req.body.weight === undefined) {
        weight = 0;
    } else {
        weight = req.body.weight;
    }

    if (req.body.selectedGP === undefined) {
        gp = 0;
    } else {
        gp = req.body.selectedGP;
    }

    //update user profile on database
    db.UpdateProfile(userid, req.body.emailAddress, req.body.fName, gp, req.body.address,
        req.body.phone, height, weight).then(
    ).then(
        data => {

            //re-render page after user profile updated depend on user's role
            getUserById(userid).then(data => {
                if (data[0].role === "GP") {
                    res.render("gppage", {userData: data});
                } else {
                    res.render("patient", {userData: data});
                }
            });
        }
    )
});

//Handle request of gp view patient's details
app.get("/singlePatient/:id/:gpId", function (req, res) {
    var userid = req.params.id;
    getUserById(userid).then(data => {
        res.render("singlepatient", {userData: data, gpId: req.params.gpId});
    })
})

//function to get account details from database by user id
async function getUserById(userid) {
    let data = await db.SelectAccountByID(userid);
    var json = JSON.stringify(data);
    return JSON.parse(json);
}

//function to add measurement data for user that from fitbit
async function syncDataFromFitBit(userId, reading, type, time) {
    let data = await db.InsertMeasurementFromFitBit(userId, reading, type, time);
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

        ///set sync date range of last date
        var endDate = new Date().toISOString().slice(0, 10);
        var fitbitCalories;
        var fitbitBurnt;

        //check when is the last time sync calories intake data from fitbit
        db.SelectLatestMeasurementDateByID(userId, "Calories Intake").then(data => {
            var json = JSON.stringify(data);
            var time = JSON.parse(json);

            //set sync date range of start date for calories intake
            var date = new Date();
            date.setDate(date.getDate() - 29);
            if (Object.keys(time).length > 0) {

                var d = new Date(time[0].timeStamp);
                if (date < d) {
                    date = d;
                }
            }

            //get calories intake data from fitbit depend on the date range
            var path = "/activities/calories/date/" + date.toISOString().slice(0,10) + "/" + endDate + ".json";

             fitbitCalories = client.get(path, result.access_token).then(results => {
                fitbitCalories = Object.values(results[0])[0];
            })
        }).then(data => {
            //check when is the last time sync calories burnt data from fitbit
            db.SelectLatestMeasurementDateByID(userId, "Calories Burnt").then(data => {
                var json = JSON.stringify(data);
                var time = JSON.parse(json);

                //set sync date range of start date for calories intake
                var date = new Date();
                date.setDate(date.getDate()-30);
                if(Object.keys(time).length > 0){
                    var d = new Date(time[0].timeStamp);
                    if(date < d){
                        date = d;
                    }
                }

                //get calories burnt data from fitbit depend on the date range
                var path = "/activities/activityCalories/date/" + date.toISOString().slice(0,10) + "/" + endDate + ".json";

                 fitbitBurnt = client.get(path, result.access_token).then(results => {
                    fitbitBurnt = Object.values(results[0])[0];

                    //add calories intake data into database
                     [...Array(fitbitCalories.length)].reduce( (p, _, i) =>
                             p.then(_ => syncDataFromFitBit(userId,fitbitCalories[i].value,'Calories Intake', fitbitCalories[i].dateTime))
                         , Promise.resolve()).then(
                             //add calories burnt data into database
                             data=>{
                         [...Array(fitbitBurnt.length)].reduce( (p, _, i) =>
                                 p.then(_ => syncDataFromFitBit(userId,fitbitBurnt[i].value,'Calories Burnt', fitbitBurnt[i].dateTime))
                             , Promise.resolve()).then(
                                 //re-render patient page after data has been add into database
                                 data=>{
                             getUserById(userId).then(data=>{
                                     res.render("patient", { userData: data});
                             })
                         })
                         }
                     );
                })
            })
        });
    }).catch(err => {
        res.status(err.status).send(err);
    });
});

//handle request of log out
app.get("/logout", function (req, res) {
        req.session.authorized = false;
        req.session.access_token = null;
        req.session.save();
        req.flash('success', "Logout successful!")
        res.redirect("/");
});


app.listen(process.env.PORT || 3000);


module.exports = app;