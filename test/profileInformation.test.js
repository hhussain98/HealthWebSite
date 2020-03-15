const Browser = require('zombie');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);
var genratedData = {userNam: "", phoneNumber: "", address: "", mheight: "", weight: "", mname: ""};

describe('Profile Information Check', function () {
    describe('User logs into the Patient page', function () {
        const browser = new Browser();
        before(function () {
            return browser.visit('/');
        });

        it('Patient Details Verified', function (done) {
            browser.fill('#username', 'hamza12')
                .then(() => browser.fill('password', 'hamza'))
                .then(() => browser.pressButton('#loginButton'))
                .then(() => browser.wait(10000).then(function () {
                    browser.assert.status(200);
                    browser.assert.text('title', "Patient");
                    browser.assert.text('#pName', "John Smith");
                    browser.assert.text('#patientEmail', "hamza@yahoo.com");
                    browser.assert.text('#patientPhone', "0749411001");
                    browser.assert.text('#address', "56 LaLa Street");
                }).then(done, done));
        });
    });
});


describe('Update Profile Information', function () {
    describe('User logs into the Patient page', function () {
        genratedData.address = makeid(8);
        genratedData.mname = makeid(5);
        genratedData.mheight = makeidInt(3);
        genratedData.weight = makeidInt(3);
        genratedData.phoneNumber = makeidInt(11);
        const browser = new Browser();
        before(function () {
            return browser.visit('/');
        });
        it('Patient Details have been changed', function (done) {
            browser.fill('#username', 'hamzatest')
                .then(() => browser.fill('password', 'hamzatest'))
                .then(() => browser.pressButton('#loginButton'))
                .then(() => browser.wait(10000).then(function () {
                    browser.assert.text("title", "Patient");
                })).then(() => browser.pressButton('#updateProfileButton'))
                .then(() => browser.wait(10000).then(function () {
                    browser.assert.text('#hieght', 'Height(cm):')
                })).then(() => browser.fill('#height', genratedData.mheight))
                .then(() => browser.fill('#weight', genratedData.weight))
                .then(() => browser.fill('#phone', genratedData.phoneNumber))
                .then(() => browser.fill('#addressInput', genratedData.address))
                .then(() => browser.fill('#fName', genratedData.mname))
                .then(() => browser.pressButton('#save'))
                .then(() => browser.wait(10000).then(function () {
                    browser.assert.text("title", "Patient");
                }))
                .then(done, done)
        });


    });


});

describe('Verify Updated profile information', function () {
    describe('User logs into the Patient page', function () {
        const browser = new Browser();
        before(function () {
            return browser.visit('/');
        });

        it('Patient Details Verified', function (done) {
            browser.fill('#username', 'hamzatest')
                .then(() => browser.fill('password', 'hamzatest'))
                .then(() => browser.pressButton('#loginButton'))
                .then(() => browser.wait(10000).then(function () {
                    browser.assert.status(200);
                    browser.assert.text('#pName', genratedData.mname);
                    browser.assert.text('#patientPhone', genratedData.phoneNumber);
                    browser.assert.text('#address', genratedData.address);
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

function makeidInt(length) {
    var result = '';
    var characters = '12344556789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}



