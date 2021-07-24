const { request } = require("express");
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT;

const handlerFunctions = require("./controller/userController.js");

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

app.get("/", (request, response) => {
  response.send("this is my first sequelize app");
});

app.post("/app/users/create", handlerFunctions.createUser);
app.get("/app/users", handlerFunctions.findAllUsers);
app.get("/app/users/:id", handlerFunctions.findOneUser);
app.put("/app/users/update/:id", handlerFunctions.updateUser);
app.delete("/app/users/delete/:id", handlerFunctions.deleteUser);
app.delete("/app/users/delete", handlerFunctions.deleteAllUsers);

app.listen(port, () => {
  console.log("sequelize app server started at port: " + port);
});
