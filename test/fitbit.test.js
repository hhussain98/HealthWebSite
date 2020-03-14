// const Browser = require('zombie');
//
// // We're going to make requests to http://example.com/signup
// // Which will be routed to our test server localhost:3000
// Browser.localhost('example.com', 3000);
//
//
// describe('Add Measurement Information', function () {
//     paramVal = makeidInt(2);
//     paramDate = todayDate();
//     console.log(paramVal);
//     describe('User logs into the Patient page', function () {
//         const browser = new Browser();
//         before(function () {
//             return browser.visit('/');
//         });
//         it('Measurement Details have been added', function (done) {
//             browser.fill('#username', 'hamzatest')
//                 .then(() => browser.fill('password', 'hamzatest'))
//                 .then(() => browser.pressButton('#loginButton'))
//                 .then(() => browser.wait(10000).then(function () {
//                     browser.assert.text("title", "Patient");
//                 })).then(() => browser.pressButton('#manualEntry'))
//                 .then(() => browser.wait(10000).then(function () {
//                     browser.assert.text('#measuremnetTitle', 'Enter Data')
//                 })).then(() => browser.fill('#paramVal', 95))
//                 .then(() => browser.fill('#measurementDate', '2020-03-15'))
//                 .then(() => browser.pressButton('#addMeasurement'))
//                 .then(() => browser.wait(10000).then(function () {
//                     browser.assert.text("title", "Patient");
//                 }))
//                 .then(done, done)
//         });
//     });
// });
//
// function makeidInt(length) {
//     var result = '';
//     var characters = '12344556789';
//     var charactersLength = characters.length;
//     for (var i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }
//
//
// function todayDate() {
//     var today = new Date();
//     var dd = today.getDate();
//
//     var mm = today.getMonth() + 1;
//     var yyyy = today.getFullYear();
//     if (dd < 10) {
//         dd = '0' + dd;
//     }
//
//     if (mm < 10) {
//         mm = '0' + mm;
//     }
//     today = `${dd}-${mm}-${yyyy}`;
//     console.log(today);
//     return today.toString();
// }