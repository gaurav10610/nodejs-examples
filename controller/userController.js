const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.User;

// Create and Save a new Tutorial
exports.createUser = (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  User.create(user)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "internal server error",
      })
    );
};

// Retrieve all Tutorials from the database.
exports.findAllUsers = (req, res) => {
  const firstNameWhereClause = req.query.name
    ? { firstName: { [Op.iLike]: `%${req.query.name}%` } }
    : null;

  User.findAll({ where: firstNameWhereClause })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "internal server error",
      })
    );
};

// Find a single Tutorial with an id
exports.findOneUser = (req, res) => {
  User.findByPk(req.params.id)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "internal server error",
      })
    );
};

// Update a Tutorial by the id in the request
exports.updateUser = (req, res) => {
  const user = {
    lastName: req.body.lastName,
    updatedAt: new Date(),
  };

  User.update(user, {
    where: { id: req.params.id },
  })
    .then((num) => {
      if (num == 1) {
        res.send("user updated successfully!");
      } else {
        res.send("unable to update user");
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "internal server error",
      })
    );
};

// Delete a Tutorial with the specified id in the request
exports.deleteUser = (req, res) => {
  User.destroy({
    where: { id: req.params.id },
  })
    .then((num) => {
      if (num == 1) {
        res.send("user deleted successfully!");
      } else {
        res.send("unable to delete user");
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "internal server error",
      })
    );
};

// Delete all Tutorials from the database.
exports.deleteAllUsers = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((num) => {
      res.send({
        message: num + " users deleted successfully!",
      });
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "internal server error",
      })
    );
};
