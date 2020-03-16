const Browser = require('zombie');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

describe('Open a a patient page up as a GP', function () {
    const browser = new Browser();
    before(function () {
        return browser.visit('/');
    });

    it('should show the login form', function (done) {
        browser.assert.status(200);
        browser.assert.text('title', "Login");
        done();
    });
    it('Patient Details are view', function (done) {
        browser.fill('#username', 'GPHamza')
            .then(() => browser.fill('password', 'gp'))
            .then(() => browser.pressButton('#loginButton'))
            .then(() => browser.wait(10000).then(function () {
                browser.assert.status(200);
            })).then(() => browser.click('#patientTable')
            .then(() => browser.wait(10000).then(function () {
                browser.assert.status(200);
                browser.assert.text('title', "Single Patient");
            }))
            .then(done, done));
    });
});



