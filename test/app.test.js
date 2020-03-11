const request = require('supertest');

//gets all the content from app.js
const  app = require('../app');


//simple test to check if the text or element is present on the page
describe("home",function () {

    it('welcome the user ', function (done) {
        request(app).get("/")
            .expect(200)
            .expect(/fgdfg/,done)
    });

})


// describe("form",function () {
//
//     it('welcome the user ', function (done) {
//         request(app).get("/d")
//
//            //fill the form details
//             .send({name: jeff})
//             .expect(302)
//             //will redirect to redirect page
//             //make another request to the app to follow through
//             .expect('Location',/\/redirect-page/,function () {
//                 request(app).get ("/redirectpage")
//                     .expect(200)
//                     .expect(/thanks/,done)
//
//             })
//
//     });
//
// })

