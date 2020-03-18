const Browser = require('zombie');
// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

describe('can view to email form model', function () {
    const browser = new Browser();
    before(function () {
        return browser.visit('/');
    });

    it('should show the login form', function (done) {
        browser.assert.status(200);
        browser.assert.text('title', "Login");
        done();
    });
    it('should display the email form on the patient page', function (done) {
        browser.fill('#username', 'GPHamza')
            .then(() => browser.fill('password', 'gp'))
            .then(() => browser.pressButton('#loginButton'))
            .then(() => browser.wait(10000).then(function () {
                browser.assert.status(200);
            })).then(() => browser.click('#patientTable')
            .then(() => browser.wait(10000).then(function () {
                browser.assert.status(200);
                browser.assert.text('title', "Single Patient");
            })).then(() => browser.click('#profile'))
            .then(() => browser.wait(10000).then(function () {
                browser.assert.status(200);
                browser.assert.text('#updateProfileButton', "Send Email");
            })).then(done, done)
        );
    });
});

describe('Send email to the user', function () {
    const browser = new Browser();
    before(function () {
        return browser.visit('/');
    });

    it('should show the login form', function (done) {
        browser.assert.status(200);
        browser.assert.text('title', "Login");
        done();
    });
    it('should send the email to the user and reload the patient page', function (done) {
        browser.fill('#username', 'GPHamza')
            .then(() => browser.fill('password', 'gp'))
            .then(() => browser.pressButton('#loginButton'))
            .then(() => browser.wait(10000).then(function () {
                browser.assert.status(200);
            })).then(() => browser.click('#patientTable')
            .then(() => browser.wait(10000).then(function () {
                browser.assert.status(200);
                browser.assert.text('title', "Single Patient");
            })).then(() => browser.click('#profile'))
            .then(() => browser.wait(10000).then(function () {
                browser.assert.status(200);
                browser.assert.text('#updateProfileButton', "Send Email");
            })).then(() => browser.click('#updateProfileButton'))
            .then(() => browser.wait(10000).then(function () {
                browser.assert.text('#exampleModalLongTitle', "Send Email");
            })).then(() => browser.fill('emailFrom', 'b6008137@gmail.com'))
            .then(() => browser.fill('emailTo', 'hamzalv12@gmail.com'))
            .then(() => browser.fill('subjectHeading', 'Mocha Test'))
            .then(() => browser.fill('messageEmail', 'Mocha Test has sent you this email'))
            .then(() => browser.click('#save'))
            .then(() => browser.wait(1000).then(function () {
                browser.assert.status(200);
                browser.assert.text('title', "Single Patient");
            })).then(done, done)
        );
    });
});

describe('Search for user data', function () {
    const browser = new Browser();
    before(function () {
        return browser.visit('/');
    });

    it('should show the login form', function (done) {
        browser.assert.status(200);
        browser.assert.text('title', "Login");
        done();
    });

    it('should only show the filtered data for the user', function (done) {
        browser.fill('#username', 'Hamza')
            .then(() => browser.fill('password', 'hamza'))
            .then(() => browser.pressButton('#loginButton'))
            .then(() => browser.wait(10000).then(function () {
                browser.assert.status(200);
                browser.assert.text('title', "Patient");
            }).then(() => browser.fill('#searchBar', '75'))
                .then(() => browser.wait(10000).then(function () {
                    browser.assert.status(200);
                    browser.assert.input('#searchBar', "75");
                }))
                .then(done, done));
    });
});

describe('The map is displayed on the page', function () {
    const browser = new Browser();
    before(function () {
        return browser.visit('/');
    });

    it('should log in', function (done) {
        browser.assert.status(200);
        browser.assert.text('title', "Login");
        done();
    });
    it('should display map on the single patient map', function (done) {
        browser.fill('#username', 'GPHamza')
            .then(() => browser.fill('password', 'gp'))
            .then(() => browser.pressButton('#loginButton'))
            .then(() => browser.wait(10000).then(function () {
                browser.assert.status(200);
            })).then(() => browser.click('#patientTable')
            .then(() => browser.wait(10000).then(function () {
                browser.assert.status(200);
                browser.assert.text('title', "Single Patient");
                browser.assert.element("#map");
            })).then(done, done)
        );
    });
});