// const Browser = require('zombie');
//
// // We're going to make requests to http://example.com/signup
// // Which will be routed to our test server localhost:3000
// Browser.localhost('example.com', 3000);
//
// describe('Slider menu hides and unhides', function () {
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
//                     browser.assert.element('#updateProfileButton');
//                 }).then(done, done));
//         });
//         it('The user has logged into the GP page ', function () {
//             browser.assert.success();
//         });
//
//         describe('Hide the Nav bar', function () {
//             after(function () {
//                 rowser.pressButton('#menu-toggle')
//                 then(() => browser.wait(10000).then(function () {
//                     browser.assert.element('#updateProfilfeButton');
//                 }).then(done, done));
//
//             });
//         });
//     });
//
// });
