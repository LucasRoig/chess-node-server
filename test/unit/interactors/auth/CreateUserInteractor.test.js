import chai from 'chai';
import chaiPromise from "chai-as-promised"
chai.use(chaiPromise);
const should = chai.should();
const expect = chai.expect;
import UserModelMock from '../../mocks/UserModelMock'
import CreateUserInteractor from '../../../../src/interactors/auth/CreateUserInteractor';

describe('user creation', function () {
    beforeEach(() => UserModelMock.clear());

    let validUser = () => {
        return {
            username: "username",
            password: "password",
            email: "email@test.com",
        }
    };

    it('should create an user', async function () {
        let userToPersist = validUser();
        let user = await CreateUserInteractor.createUser(userToPersist.username, userToPersist.email, userToPersist.password);
        user.should.have.property('username');
        UserModelMock.saveStub().called.should.be.true;
    });

    it('should not create an user if the username already exists', async function () {
        let userToPersist = validUser();
        let user = await CreateUserInteractor.createUser(userToPersist.username, "12" + userToPersist.email, userToPersist.password);
        CreateUserInteractor.createUser(userToPersist.username,userToPersist.email,userToPersist.password).should.be.rejected;
        UserModelMock.saveStub().callCount.should.equal(1);
    });

    it('should not create an user if the email already exists', async function () {
        let userToPersist = validUser();
        let user = await CreateUserInteractor.createUser(userToPersist.username + "12", userToPersist.email, userToPersist.password);
        CreateUserInteractor.createUser(userToPersist.username,userToPersist.email,userToPersist.password).should.be.rejected;
        UserModelMock.saveStub().callCount.should.equal(1);
    });

    it('should not create an user if the username is null', async function () {
        let userToPersist = validUser();
        CreateUserInteractor.createUser(null,userToPersist.email,userToPersist.password).should.be.rejected;
        UserModelMock.saveStub().called.should.be.false;
    });

    it('should not create an user if the email is null', async function () {
        let userToPersist = validUser();
        CreateUserInteractor.createUser(userToPersist.username,null,userToPersist.password).should.be.rejected;
        UserModelMock.saveStub().called.should.be.false;
    });

    it('should not create an user if the password is null', async function () {
        let userToPersist = validUser();
        CreateUserInteractor.createUser(userToPersist.username,userToPersist.email,null).should.be.rejected;
        UserModelMock.saveStub().called.should.be.false;
    });

    it('should not create an user if the email is not valid', async function () {
        let userToPersist = validUser();
        CreateUserInteractor.createUser(userToPersist.username,"test",userToPersist.password).should.be.rejected;
        UserModelMock.saveStub().called.should.be.false;
    });

    it('should not create an user if the username is empty', async function () {
        let userToPersist = validUser();
        CreateUserInteractor.createUser("",userToPersist.email,userToPersist.password).should.be.rejected;
        UserModelMock.saveStub().called.should.be.false;
    });

    it('should not create an user if the email is empty', async function () {
        let userToPersist = validUser();
        CreateUserInteractor.createUser(userToPersist.username,"",userToPersist.password).should.be.rejected;
        UserModelMock.saveStub().called.should.be.false;
    });

    it('should not create an user if the password is empty', async function () {
        let userToPersist = validUser();
        CreateUserInteractor.createUser(userToPersist.username,userToPersist.email,"").should.be.rejected;
        UserModelMock.saveStub().called.should.be.false;
    });

    it('should not return the password', async function () {
        let userToPersist = validUser();
        let user = await CreateUserInteractor.createUser(userToPersist.username, userToPersist.email, userToPersist.password);
        expect(user.password).to.be.undefined;
    });});