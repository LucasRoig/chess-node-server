import {User} from "../../models/index";

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 *
 * @param {String} username
 * @param {String} password
 * @param {String} email
 * @returns {User}
 */
let createUser = async (username, email, password) => {
    let error = false;
    let errorModel = {};

    if (!username || username === "") {
        error = true;
        errorModel.username = "Le nom d'utilisateur ne peux pas être vide."
    } else {
        let sameUsernameUser = await User.findOne({username});
        if (sameUsernameUser) {
            error = true;
            errorModel.username = "Un compte avec cet nom d'utilisateur existe déjà."
        }
    }

    if (!email || email === "") {
        error = true;
        errorModel.email = "L'adresse mail ne peux pas être vide."
    } else if (!validateEmail(email)) {
        error = true;
        errorModel.email = "L'addresse mail doit être valide."
    } else {
        let sameEmailUser = await User.findOne({email});
        if (sameEmailUser) {
            error = true;
            errorModel.email = "Un utilisateur avec cet email existe déjà.";
        }
    }

    if (!password || password === "") {
        error = true;
        errorModel.password = "Le mot de passe ne peux pas être vide."
    }


    if (error) {
        throw errorModel;
    }

    let user = new User({username, password, email});

    user = await user.save();
    delete user._doc.password;
    return user;
};

export default {
    createUser
}
