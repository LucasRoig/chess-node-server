import User from "../../src/models/User";

function validUserData() {
    return {
        username: 'test',
        password: 'test',
        email:"test@test.com"
    }
}

/**
 *
 * @returns {User}
 */
async function getPersistedUser() {
    let u = new User(validUserData());
    u = await u.save();
    return u;
}

export default {
    validUserData,
    getPersistedUser,
}