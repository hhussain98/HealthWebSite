const Browser = require('zombie');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);
var userName;
var patientName;
var gpId;

describe('Log in Processes', function () {
    const browser = new Browser();
    before(function () {
        return browser.visit('/signup');
    });
    it('should show the sign up form', function () {
        browser.assert.status(200);
        browser.assert.text('title', "Create Account");
    });

    it('Sign form for patient is Submitted', function (done) {
        userName = makeid(3);
        patientName = makeid(7);
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

    describe('User logs into the Patient page', function () {
        const browser = new Browser();
        before(function () {
            return browser.visit('/');
        });

        it('should show the login form', function (done) {
            browser.assert.status(200);
            browser.assert.text('title', "Login");
            done();
        });

        it('Patient has logged in', function (done) {
            browser.fill('#username', 'Hamza')
                .then(() => browser.fill('password', 'hamza'))
                .then(() => browser.pressButton('#loginButton'))
                .then(() => browser.wait(10000).then(function () {
                    browser.assert.status(200);
                    browser.assert.text('title', "Patient");
                }).then(done, done));
        });
    });


    describe('User logs into the GP page', function () {
        const browser = new Browser();
        before(function () {
            return browser.visit('/');
        });

        it('should show the login form', function (done) {
            browser.assert.status(200);
            browser.assert.text('title', "Login");
            done();
        });

        it('GP has logged in', function (done) {
            browser.fill('#username', 'GPHamza')
                .then(() => browser.fill('password', 'gp'))
                .then(() => browser.pressButton('#loginButton'))
                .then(() => browser.wait(10000).then(function () {
                    browser.assert.status(200);
                    browser.assert.text('title', "GP");
                }).then(done, done));
        });
    });


});

describe('Sign up for GP', function () {
    const browser = new Browser();
    before(function () {
        return browser.visit('/signup');
    });
    it('should show the sign up form', function () {
        browser.assert.status(200);
        browser.assert.text('title', "Create Account");
    });
    it('Sign form for gp is Submitted', function (done) {
        userName = makeid(3);
        patientName = makeid(7);
        gpId = makeidInt(4);
        browser.fill('#username', userName)
            .then(() => browser.fill('password', 'h'))
            .then(() => browser.fill('#email', 'hamza@gmail.com'))
            .then(() => browser.fill('phone', '011424544'))
            .then(() => browser.fill('fName', patientName))
            .then(() => browser.fill('birthday', '2018-07-22'))
            .then(() => browser.selectOption('isGp'))
            .then(() => browser.fill('#gpID', gpId))
            .then(() => browser.pressButton('#signup'))
            .then(() => browser.wait(10000).then(function () {
                browser.assert.status(200);
                browser.assert.text('title', "Login");
            }).then(done, done));
    });
});

describe('Sign up as a duplicate user', function () {
    const browser = new Browser();
    before(function () {
        return browser.visit('/signup');
    });
    it('should show the sign up form', function () {
        browser.assert.status(200);
        browser.assert.text('title', "Create Account");
    });
    it('Should not sign up due to duplicated user', function (done) {
        userName = makeid(3);
        patientName = makeid(7);
        gpId = makeidInt(4);
        browser.fill('#username', 's')
            .then(() => browser.fill('password', 'h'))
            .then(() => browser.fill('#email', 'hamza@gmail.com'))
            .then(() => browser.fill('phone', '011424544'))
            .then(() => browser.fill('fName', patientName))
            .then(() => browser.fill('birthday', '2018-07-22'))
            .then(() => browser.selectOption('isGp'))
            .then(() => browser.fill('#gpID', gpId))
            .then(() => browser.pressButton('#signup'))
            .then(() => browser.wait(10000).then(function () {
                browser.assert.status(200);
                browser.assert.text('title', "Create Account");
            }).then(done, done));
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



