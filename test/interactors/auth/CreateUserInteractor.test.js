import chai from 'chai';

const should = chai.should();
import UserModelMock from '../../mocks/UserModelMock'
import CreateUserInteractor from '../../../src/interactors/auth/CreateUserInteractor';

describe('user creation', function () {
    beforeEach(() => UserModelMock.clear());
    it('should create an user', async function () {

        let user = await CreateUserInteractor.createUser('bli', 'blu');
        user.should.have.property('username');
        UserModelMock.saveHasBeenCalled().should.be.true;
    });

    it('should not create an user if it already exists', async function () {
        let user = await CreateUserInteractor.createUser('bli', 'blu');
        user.should.have.property('username');
        UserModelMock.saveHasBeenCalled().should.be.false;
    })
});