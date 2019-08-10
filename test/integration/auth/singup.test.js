import server from '../../../index'
import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import {User} from '../../../src/models';
import {dbPromise} from "../../../src/database";

chai.use(chaiHttp);


const should = chai.should();
const expect = chai.expect;

describe('Signup route tests', function () {
    beforeEach(async function () {
        console.log("environment : " + process.env.NODE_ENV)
        await dbPromise;
        await mongoose.connection.db.dropDatabase();
    });

    function signup(data){
        return chai.request(server).post("/api/v1/signup").send(data)
    }

    function validUserData(){
        return {
            username: 'test',
            password: 'test',
            email:"test@test.com"
        }
    }

    it('should create an user', function (done) {
        this.timeout(10000)
        signup(validUserData())
            .end(async function (err, res) {
                res.statusCode.should.equal(200);
                let user = await User.findById(res.body._id);
                user.should.not.be.null;
                done();
            });
    });

    it("should send an error if the email or username is already taken", function (done) {
        let user = validUserData();
        signup(user)
            .end(function (err, res) {
                res.statusCode.should.equal(200);
                signup(user)
                    .end(function (err, res) {
                        res.statusCode.should.equal(400);
                        res.body.email.should.equal("Un utilisateur avec cet email existe déjà.");
                        res.body.username.should.equal("Un compte avec cet nom d'utilisateur existe déjà.");
                        done()
                    })
            })
    });

    it("should send an error if the email is empty", function (done) {
       let user = validUserData();
       user.email = "";
       signup(user).end(function (err,res) {
           res.statusCode.should.equal(400);
           res.body.email.should.equal("L'adresse mail ne peux pas être vide.");
           done();
       })
    });

    it("should send an error if the email is not valid", function (done) {
        let user = validUserData();
        user.email = "test";
        signup(user).end(function (err,res) {
            res.statusCode.should.equal(400);
            res.body.email.should.equal("L'addresse mail doit être valide.");
            done();
        })
    });

    it("should send an error if the email is not present", function (done) {
        let user = {
            password: "test",
            username: "test"
        };
        signup(user).end(function (err, res) {
            res.statusCode.should.equal(400);
            res.body.email.should.equal("L'adresse mail ne peux pas être vide.");
            done();
        })
    });

    it("should send an error if the username is empty", function (done) {
        let user = validUserData();
        user.username = "";
        signup(user).end(function (err,res) {
            res.statusCode.should.equal(400);
            res.body.username.should.equal("Le nom d'utilisateur ne peux pas être vide.");
            done();
        })
    });

    it("should send an error if the username is not present", function (done) {
        let user = {
            password: "test",
            email: "test@test.com"
        };
        signup(user).end(function (err, res) {
            res.statusCode.should.equal(400);
            res.body.username.should.equal("Le nom d'utilisateur ne peux pas être vide.");
            done();
        })
    });

    it("should send an error if the password is empty", function (done) {
        let user = validUserData();
        user.password = "";
        signup(user).end(function (err,res) {
            res.statusCode.should.equal(400);
            res.body.password.should.equal("Le mot de passe ne peux pas être vide.");
            done();
        })
    });

    it("should send an error if the password is not present", function (done) {
        let user = {
            username: "test",
            email: "test@test.com"
        };
        signup(user).end(function (err, res) {
            res.statusCode.should.equal(400);
            res.body.password.should.equal("Le mot de passe ne peux pas être vide.");
            done();
        })
    });

    it("should combine errors", function (done) {
        let user = {};
        signup(user).end(function (err, res) {
            res.statusCode.should.equal(400);
            res.body.password.should.equal("Le mot de passe ne peux pas être vide.");
            res.body.email.should.equal("L'adresse mail ne peux pas être vide.");
            res.body.username.should.equal("Le nom d'utilisateur ne peux pas être vide.");
            done();
        })
    });

    it('should hash password', function (done) {
        let user = validUserData();
        signup(user).end(async function (err, res) {
            let dbUser = await User.findById(res.body._id);
            dbUser.should.not.be.null;
            dbUser.password.should.not.be.empty;
            dbUser.password.should.not.equal(user.password);
            done();
        })
    });

    it('should not send password', function (done) {
        signup(validUserData()).end(function (err, res) {
            res.status.should.equal(200);
            expect(res.body.password).to.be.undefined;
            done();
        })
    })
});