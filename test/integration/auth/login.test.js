import server from '../../../index'
import mongoose from 'mongoose';
import {dbPromise} from "../../../src/database";
import chai from 'chai';
import chaiHttp from 'chai-http';

import UserHelper from "../UserHelper";
chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;

describe('Login route tests', function () {
    beforeEach(async function () {
        await dbPromise;
        await mongoose.connection.db.dropDatabase();
    });

    function login(data) {
        return chai.request(server).post("/api/v1/login").send(data);
    }

    it("should respond 401 if the user does not exists", function (done) {
        login(UserHelper.validUserData()).end(function (err, res) {
            res.status.should.equal(401);
            done();
        })
    });

    it("should respond 401 if the password is wrong", async function (done) {
        let user = await UserHelper.getPersistedUser();
        login({ username : user.username, password: "veryBadPassword"}).end(function (err, res) {
            res.status.should.equal(401);
            done();
        })
    });

    it("should respond 401 if the password is empty", async function (done) {
        let user = await UserHelper.getPersistedUser();
        login({ username : user.username, password: ""}).end(function (err, res) {
            res.status.should.equal(401);
            done();
        })
    });

    it("should respond 401 if the password is null", async function (done) {
        let user = await UserHelper.getPersistedUser();
        login({ username : user.username}).end(function (err, res) {
            res.status.should.equal(401);
            done();
        })
    });

    it("should respond 401 if the username does not match any username or email", async function (done) {
        let user = await UserHelper.getPersistedUser();
        login({username: "veryBadUserName", password: user.password}).end(function (err, res) {
            res.status.should.equal(401);
            done();
        })
    });

    it("should respond 401 if the username is empty", async function (done) {
        let user = await UserHelper.getPersistedUser();
        login({username: "", password: user.password}).end(function (err, res) {
            res.status.should.equal(401);
            done();
        })
    });

    it("should respond 401 if the username is null", async function (done) {
        let user = await UserHelper.getPersistedUser();
        login({password: user.password}).end(function (err, res) {
            res.status.should.equal(401);
            done();
        })
    });

    it("should respond 200 if the username and password match", async function (done) {
        let user = await UserHelper.getPersistedUser();
        login({username:user.username, password: user.password}).end(function (err, res) {
            res.status.should.equal(200);
            res.body.token.should.not.be.empty;
            done();
        })
    });

    it("should respond 200 if the email and password match", async function (done) {
        let user = await UserHelper.getPersistedUser();
        login({username:user.email, password: user.password}).end(function (err, res) {
            res.status.should.equal(200);
            res.body.token.should.not.be.empty;
            done();
        })
    });
});