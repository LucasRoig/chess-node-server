import {CreateUserInteractor} from "../interactors/auth"

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
let signup = async (req, res) => {
    const {username, password, email} = req.body;
    try {
        let user = await CreateUserInteractor.createUser(username, email, password);
        res.json(user);
    } catch (e) {
        res.status(400).json(e);
    }
};

export default {
    signup
}