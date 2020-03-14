var app = require("../").app;
var server = require("../").server;
var Browser = require('zombie');
var assert = require('assert');
var userName;
var patientName;
describe("Sign Up Processes", function () {
    userName = makeid(3);
    patientName = makeid(7);
    after(function (done) {
        server.close();
        done();
    });

    before(function () {
        // initialize the browser using the same port as the test application
        this.browser = new Browser({site: 'http://localhost:3000'});
    });
    // load the contact page
    before(function (done) {
        this.browser.visit('/signup', done);
    });
    describe('Sign up page', function () {
        it('should show sign up form', function () {
            assert.ok(this.browser.success);
            assert.equal(this.browser.text('h2'), 'Sign up');
            assert.equal(this.browser.text('p'), 'Username:Full Name:Password:Email:Phone number:Date of Birth:GP IDAlready have an account?');
        });

        it('should accept complete submissions', function (done) {
            var browser = this.browser;
            browser.fill('#username', userName)
                .then(() => browser.fill('password', 'h'))
                .then(() => browser.fill('#email', 'hamza@gmail.com'))
                .then(() => browser.fill('phone', '011424544'))
                .then(() => browser.fill('fName', patientName))
                .then(() => browser.fill('birthday', '2018-07-22'))
                .then(() => browser.pressButton('#signup'))
                .then(() => browser.wait(10000).then(function () {
                    browser.assert.status(200);
                    browser.assert.text('title', "Login");
                }).then(done, done));
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