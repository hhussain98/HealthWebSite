const Browser = require('zombie');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

describe('Slider menu hide and unhide ', function () {
    const browser = new Browser();
    before(function () {
        return browser.visit('/');
    });
    describe('Submit log in form', function (done) {
        before(function () {
            browser.fill('#username', 's')
                .then(() => browser.fill('password', 's'))
                .then(() => browser.pressButton('#loginButton'))
                .then(() => browser.wait(10000).then(function () {
                    browser.assert.status(200);
                    browser.assert.text('title', "Patient");
                }).then(done, done));
        });

        after(function (done) {
            it('The user ha logged into the home page ', function () {
                browser.assert.text('title', "Patient");
            });

            it('The elements on the slide are visiable ', function () {
                browser.assert.element('#logoutFitbit');
            });
        });

    });
});




