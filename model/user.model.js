const mongoose  = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"User name can't be empty"],
        minLength:[4,"Name should minimum 4 character"],
        maxLength:[20,"Name should maximun 20 character"]
    },
    phone:{
        type:String,
        unique:[true,"duplicate phone number"],
        require:[true,"phone required"],
        minLength:[10,"phone number should 10 character"],
        maxLength:[10,"phone number should 10 character"]
    },
    phone1:{
        type:String,
        unique:[true,"duplicate phone number"],
        require:[true,"phone required"],
        minLength:[10,"phone number should 10 character"],
        maxLength:[10,"phone number should 10 character"]
    },
    password:{
        type:String,
        require:[true,"password can't be empty"],
        select:false
    },
    sessionID:{
        type:String,
        select:false,
        default:null
    }
});

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id },process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


const User = mongoose.model("User",userSchema);
module.exports =User;