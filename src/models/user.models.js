const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({

    createdAt: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        required: [true, "name is required!"],
        validate: {
            validator: function (value) {
                return /^[a-zA-Z]+$/.test(value);
            },
            message: (name) => `${name.value} is not a valid name!`
        },
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"],
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "invalid email format!"
        },
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false,
        minLength: [6, "Password too short!"],
    },
    username: {
        type: String,
        unique: true,
        required: [true, "username is required"],
        validator: function (value) {
            return /^[a-zA-Z0-9]+$/.test(value);
        },
        message: 'Username must contain only alphabets and numbers',
    }


})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

UserSchema.methods.generateToken = async function () {
    return await jwt.sign({ _id: this._id }, process.env.JWT_KEY, {
        expiresIn: '7d',
    });
};

UserSchema.methods.comparePassword = async function (password) {
    console.log(password, this.password)
    return await bcrypt.compare(password, this.password);
}


module.exports = mongoose.model("users", UserSchema);