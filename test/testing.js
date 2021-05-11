let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let apiRouter = require('../apiRouter').router
//let cors = require('cors')
//const corsOptions = require('./funcs/functions')
let config = require('../config/config')
let token;

///////////// Assertions style  ///////////////////
chai.should();
chai.use(chaiHttp);

describe('Task API', () =>{

        /**
     * Test the POST Route
     */
         describe('POST /api/v1/user/login', () =>{
            var user = {
                email: 'apitesuser@yopmail.com',
                password: '@roose50'
            };
    
            it('should logged user', (done) =>{
                chai.request('http://localhost:3000')
                .post('/api/v1/user/login')
                .send({userId: 1, email: 'apitesuser@yopmail.com', password: '@roose50' })
                .end((err, response) =>{
                    console.log("token: " +response.body.token);
                    token = response.body.token
                    response.text.should.be.eq(response.text);
                    response.should.have.status(200);
                    done();
                })
            })

            it('It should NOT logged user', (done) =>{
                chai.request('http://localhost:3000')
                .post('/api/v1/user/login')
                .end((err, response) =>{
                    if(err){
                    response.should.have.status(400);
                    response.text.should.be.eq('missing parameters');
                    }
 
                    done();
                })
            })
        })
    

    /**
     * Test the Get Route
     */
    describe('GET /api/v1/admin/users', () =>{
        it('should GET all users', (done) =>{
            console.log(token)

            chai.request('http://localhost:3000')
            .get('/api/v1/admin/users')
            .set('Authorization', 'Bearer ' + token)
            .end((err, response) =>{
                console.log(response.body)
                response.should.have.status(200);
                response.body.should.be.a('array');
                done();
            })
        })

        it('It should NOT GET all users', (done) =>{
            chai.request('http://localhost:3000')
            .get('/api/v1/admin/users')
            .end((err, response) =>{
                if(err) {
                response.should.have.status(400);
                response.text.should.be.eq('You are not an admin!');
                }

                done();
            })
        })
    })



    /**
     * Test the Get (by id) Route
     */



    /**
     * Test the DELETE Rout
     */


    /**
     * Test the PUT Rout
     */



})
