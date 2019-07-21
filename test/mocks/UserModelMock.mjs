import sinon from 'sinon';
import {User} from "../../src/models/index";

let users = [];
let saveStub = sinon.stub(User.prototype,"save").callsFake(function () {
    users.push(this);
    return this;
});

export default {
    saveHasBeenCalled : () => saveStub.called,
    clear: () => {
        users = [];
    }
}