// const Browser = require('zombie');
//
// // We're going to make requests to http://example.com/signup
// // Which will be routed to our test server localhost:3000
// Browser.localhost('example.com', 3000);
// var userName;
// var patientName;
// describe('Sign up as a user', function () {
//     const browser = new Browser();
//     before(function () {
//         return browser.visit('/signup');
//     });
//     describe('Submit signup in form', function (done) {
//         userName = makeid(3);
//         patientName = makeid(7);
//         console.log(userName);
//         before(function () {
//             browser.fill('#username', userName)
//                 .then(() => browser.fill('password', 'h'))
//                 .then(() => browser.fill('#email', 'hamza@gmail.com'))
//                 .then(() => browser.fill('phone', '011424544'))
//                 .then(() => browser.fill('fName', patientName))
//                 .then(() => browser.fill('birthday', '2018-07-22'))
//                 .then(() => browser.pressButton('#signup'))
//                 .then(() => browser.wait(10000).then(function () {
//                     browser.assert.status(200);
//                     browser.assert.text('title', "Login");
//                 }).then(done, done));
//         });
//         it('User has signed up', function () {
//             browser.assert.success();
//         });
//         it('User has been redirected to the Login Page', function () {
//             browser.assert.success();
//         });
//     });
// });
//
//
// describe('User logs into the patient page', function () {
//     const browser = new Browser();
//     before(function () {
//         return browser.visit('/');
//     });
//     describe('Submit log in form', function (done) {
//         before(function () {
//             browser.fill('#username', 'ehealth')
//                 .then(() => browser.fill('password', 'ehealth'))
//                 .then(() => browser.pressButton('#loginButton'))
//                 .then(() => browser.wait(10000).then(function () {
//                     browser.assert.status(200);
//                     browser.assert.text('title', "Patient");
//                 }).then(done, done));
//         });
//         it('The user has logged into the patient page ', function () {
//             browser.assert.success();
//         });
//     });
// });
//
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
//         it('The user has logged into the GP page ', function () {
//             browser.assert.success();
//         });
//     });
// });
//
//
// // describe('The correct profile information is displayed upon sign up', function () {
// //     const browser = new Browser();
// //     before(function () {
// //         return browser.visit('/');
// //     });
// //     describe('Submit log in form and check the user information', function (done) {
// //         before(function () {
// //             browser.fill('#username', 'ehealth')
// //                 .then(() => browser.fill('password', 'ehealth'))
// //                 .then(() => browser.pressButton('#loginButton'))
// //                 .then(() => browser.wait(10000).then(function () {
// //                     browser.assert.status(200);
// //                     browser.assert.text('h1', "John Smith");
// //                     browser.assert.text('h1', "ehealth@hotmail.com");
// //                     browser.assert.text('h1', "07494331122");
// //                     browser.assert.text('h1', "John Smith");
// //
// //
// //                 }).then(done, done));
// //         });
// //         it('Information is correct ', function () {
// //             browser.assert.success();
// //         });
// //     });
// // });
// //
//
// // describe('Logout of the home page', function () {
// //     const browser = new Browser();
// //     before(function () {
// //         return browser.visit('/');
// //     });
// //
// //     describe('Submit log in form', function (done) {
// //         before(function () {
// //             browser.fill('#username', 'ehealth')
// //                 .then(() => browser.fill('password', 'ehealth'))
// //                 .then(() => browser.pressButton('#loginButton'))
// //                 .then(() => browser.wait(10000).then(function () {
// //                     browser.assert.status(200);
// //                     browser.assert.text('title', "Patient");
// //                 })).then(() => browser.pressButton('#loginButton'))
// //                 .then(() => browser.wait(10000).then(function () {
// //                     browser.assert.status(200);
// //                     browser.assert.text('title', "Patient");
// //                 }).then(done, done));
// //         });
// //         it('The user has logged into the patient page ', function () {
// //             browser.assert.success();
// //         });
// //     });
// // });
//
//
// function makeid(length) {
//     var result = '';
//     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//     var charactersLength = characters.length;
//     for (var i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }
//
//
