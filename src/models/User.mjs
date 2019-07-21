import mongoose from 'mongoose';
import Bcrypt from 'bcrypt';

let Schema = mongoose.Schema;
let userSchema = new Schema({
    username: String,
    password: String,
});

userSchema.pre('save', function (next) {
    if(!this.isModified("password")){
        return next();
    }
    this.password = Bcrypt.hashSync(this.password,10);
    next();
});

userSchema.methods.comparePassword = function(plaintext){
    return Bcrypt.compareSync(plaintext,this.password);
};

let User = mongoose.model('User', userSchema);

export default User;