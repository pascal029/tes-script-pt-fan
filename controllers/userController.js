const { response } = require("express");
const Model = require("../models");

class UserController {
  static login(req, res, next) {
    const input = { email: req.body.email, password: req.body.password };
    Model.login(input, (err, response) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({ token: response });
      }
    });
  }

  static async insertEpresence(req, res, next) {
    const { type, waktu } = req.body;
    const input = { type, waktu, id: req.user.id };

    Model.insertEpresence(input, (err, response) => {
      if (err) {
        res.status(500).json(err);
      } else {
        type == "IN"
          ? (response = "Sukses mengisi daftar masuk")
          : (response = "Sukses mengisi daftar pulang");
        res.status(200).json(response);
      }
    });
  }

  static async getData(req, res, next) {
    try {
      const { id_users } = req.params;
      Model.getData(id_users, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          res.status(200).json({ message: "Success get data", data });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
