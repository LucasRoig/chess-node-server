import {CreateUserInteractor} from "../interactors/auth"

let signup = async (req,res) =>{
    const {username,password} = req.body;
    let user = await CreateUserInteractor.createUser(username, password);
    res.json(user);
};

export default {
    signup
}