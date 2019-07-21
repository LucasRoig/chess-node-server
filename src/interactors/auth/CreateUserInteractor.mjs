import {User} from "../../models/index";
let createUser = async (username, password) => {
    let user = new User({username,password});

    user = await user.save();
    return user;
};

export default {
    createUser
}
