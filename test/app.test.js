const request = require('supertest');

//gets all the content from app.js
const  app = require('../app');

//simple test to check if the text or element is present on the page
describe("home",function () {

    it('welcome the user ', function (done) {
        request(app).get("/")
            .expect(200)
            .expect(/Login/,done)
    });

});


