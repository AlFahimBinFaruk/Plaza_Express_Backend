const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("plaza", "root", "root", {
    host: "localhost",
    dialect: "mysql"
});


module.exports = sequelize;