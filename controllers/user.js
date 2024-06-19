const User = require("../models/user");

const bcrypt = require("bcrypt");

const generateAccesstoken = require("../utils/generateAccessToken");

const registerUser = async (req, res) => {

    let { first_name, last_name, email, phone, password, role } = req.body;

    if (!first_name || !email || !password) {
        return res.status(400).json({ msg: "Provide all info." });
    }

    if (!role) {
        role = "user";
    }

    const userExits = await User.findOne({ where: { email } });

    if (userExits) {
        return res.status(400).json({ msg: "User already exits" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);



    const user = await User.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        user_role: role,
        user_password: hashedPassword
    });

    if (user) {
        return res.status(201).json({
            msg: "user created successfully",
            user_id: user.user_id,
            name: user.first_name + " " + user.last_name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            accessToken: generateAccesstoken(user.user_id)
        });
    } else {
        return res.status(400).json({ msg: "Invalid creds." });
    }


}


const loginUser = async (req, res) => {


    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.user_password))) {
        return res.status(200).json({
            msg: "login successful.",
            user_id: user.user_id,
            name: user.first_name + " " + user.last_name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            accessToken: generateAccesstoken(user.user_id)
        });
    } else {
        return res.status(400).json({ msg: "Invalid creds." });
    }


}

// only admin and user himself can use these feature
const getUserDetails = async (req, res) => {

    const user_id = req.params.user_id;

    const user = await User.findOne({ where: { user_id } });

    if (user) {
        return res.status(200).json({
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } else {
        return res.status(404).json({
            msg: "User not found."
        });
    }

}

const deleteUser = () => { }

const updateUser = () => { }

// only admin can use these features
const getAllUserList = () => {

}


module.exports = {
    registerUser,
    loginUser,
    getUserDetails,
    deleteUser,
    updateUser,
    getAllUserList
}