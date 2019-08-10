import sinon from 'sinon';
import {User} from "../../../src/models/index";

let users = [];
let saveStub = sinon.stub(User.prototype,"save").callsFake(function () {
    users.push(this);
    return this;
});

let findStub = sinon.stub(User,"findOne").callsFake(function (query) {
   for (let user of users){
       let match = true;
       for (let prop in query){
           if(user[prop] !== query[prop]) {
               match = false;
           }
       }
       if(match) return user;
   }
   return null;
});

export default {
    saveStub : () => saveStub,
    clear: () => {
        users = [];
        saveStub.resetHistory();
        findStub.resetHistory();
    }
}