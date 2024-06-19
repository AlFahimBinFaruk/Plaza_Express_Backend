const jwt = require("jsonwebtoken");

const generateAccesstoken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "30d",
    });
};


module.exports = generateAccesstoken;