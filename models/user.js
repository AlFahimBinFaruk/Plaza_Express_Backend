const { DataTypes, Model } = require("sequelize");

const sequelize = require("../db");

const { v4: uuidv4 } = require('uuid');


const User = sequelize.define("users", {
    user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: uuidv4
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: /^\d{11}$/,
            notEmpty: true
        }
    },
    user_role: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false
    }

},
    {
        timestamps: true//will automatically handle createdAt,updatedAt.
    });


module.exports = User;