const Browser = require('zombie');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);
var userName;
var patientName;
describe('Sign up as a user', function () {
    const browser = new Browser();
    before(function () {
        return browser.visit('/signup');
    });

    describe('Submit signup in form', function (done) {
        userName = makeid(3);
        patientName = makeid(7);
        console.log(userName);
        before(function () {
            browser.fill('#username', userName)
                .then(() => browser.fill('password', 'h'))
                .then(() => browser.fill('#email', 'hamza@gmail.com'))
                .then(() => browser.fill('phone', '011424544'))
                .then(() => browser.fill('fName', patientName))
                .then(() => browser.fill('birthday', '2018-07-22'))
                .then(() => browser.pressButton('#signup'))
                .then(() => browser.wait(10000).then(function () {
                    describe('Submit log in form', function (done) {
                        before(function () {
                            console.log(userName);
                            browser.fill('#username', userName)
                                .then(() => browser.fill('password', 'h'))
                                .then(() => browser.pressButton('#loginButton'))
                                .then(() => browser.wait(10000).then(function () {
                                    browser.assert.status(200);
                                    browser.assert.text('title', "Patient");
                                }).then(done, done));
                        });
                        it('should be successful', function () {
                            browser.assert.success();
                        });
                    });
                    browser.assert.status(200);
                    browser.assert.text('title', "Login");
                }).then(done, done));
        });
        it('User has signed up', function () {
            browser.assert.success();
        });
    });
});


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


//
// describe('User logs into the patient page', function () {
//
//     const browser = new Browser();
//     before(function () {
//         return browser.visit('/');
//     });
//     describe('Submit log in form', function (done) {
//         before(function () {
//             browser.fill('#username', 's')
//                 .then(() => browser.fill('password', 's'))
//                 .then(() => browser.pressButton('#loginButton'))
//                 .then(() => browser.wait(10000).then(function () {
//                     browser.assert.status(200);
//                     browser.assert.text('title', "Patient");
//                 }).then(done, done));
//         });
//         it('should be successful', function () {
//             browser.assert.success();
//         });
//     });
// });
//
// describe('User logs into the GP page', function () {
//     const browser = new Browser();
//     before(function () {
//         return browser.visit('/');
//     });
//     describe('Submit log in form', function (done) {
//         before(function () {
//             browser.fill('#username', 'w')
//                 .then(() => browser.fill('password', 'w'))
//                 .then(() => browser.pressButton('#loginButton'))
//                 .then(() => browser.wait(10000).then(function () {
//                     browser.assert.status(200);
//                     browser.assert.text('title', "GP");
//                 }).then(done, done));
//         });
//         it('should be successful', function () {
//             browser.assert.success();
//         });
//     });
// });
//

// const request = require('supertest');
// var browser = require('zombie');
//
// //gets all the content from app.js
// const  app = require('../app');
//
// browser.localhost('example.com', 3000);
//
// describe('Log into the website', function() {
//
//     before(function() {
//         console.log()
//         return browser.visit('localhost:3000');
//     });
//
//     it('should see the login page', function() {
//         browser.assert.text('title', 'Login');
//     });
//     describe('Submit logging form', function(done) {
//         before(function() {
//             browser.fill('#username', 's')
//                 .then(() => browser.fill('password', 's'))
//                 .then(() => browser.pressButton('#loginButton', done));
//         });
//
//
//
//         it('should be successful', function() {
//             browser.assert.success();
//         });
//
//     });
//
// });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// // describe("form",function () {
// //
// //     it('welcome the user ', function (done) {
// //         request(app).get("/d")
// //
// //            //fill the form details
// //             .send({name: jeff
// //             uern
// //             })
// //             .expect(302)
// //             //will redirect to redirect page
// //             //make another request to the app to follow through
// //             .expect('Location',/\/redirect-page/,function () {
// //                 request(app).get ("/redirectpage")
// //                     .expect(200)
// //                     .expect(/thanks/,done)
// //
// //             })
// //
// //     });
// //
// // })
//
