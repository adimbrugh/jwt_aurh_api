const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true,'please inter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail,'please inter avalid email']
    },
    password:{
        type: String,
        required: [true, 'please inter an password'],
        minlength: [6,'minimum password ength is 6 charctares']
    },
});

//fire a function before doc to db
//hashing password
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//static method to login user
userSchema.static.login = async function (email, password) {
    const user = await this.findOne({email});
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}


module.exports = mongoose.model('user', userSchema);