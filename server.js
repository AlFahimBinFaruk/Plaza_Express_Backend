require("dotenv").config();

const express = require("express");
const app = express();

const sequelize = require("./db");

const PORT = process.env.PORT || 3000;


const middlewares = [
    express.json(),
    express.urlencoded({ extended: true })
];

app.use(middlewares);






app.get("/", (req, res) => {
    res.json({ msg: "API is Live!!!" });
})


app.use("/api/user", require("./routes/user"));



sequelize.authenticate().then(() => {
    console.log("DB Connection successful.");
    app.listen(PORT, () => {
        console.log("Server is running!!");
    });
}).catch(err => {
    console.log("Unable to connect to DB.");
});

