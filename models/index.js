const { pool } = require("../config");
const Query = require("./queries");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class Model {
  static login(input, cb) {
    if (!input.email || !input.password) return cb("all fields are required");
    pool.query(Query.queryFindUser(input.email), (err, res) => {
      if (err) {
        cb(err);
      } else {
        const user = res.rows[0];
        if (!user) {
          err = "invalid email or password";
          return cb(err);
        }
        const isValidPassword = bcrypt.compareSync(
          input.password,
          user.password
        );
        if (!isValidPassword) {
          err = "invalid email or password";
          return cb(err);
        }

        const token = jwt.sign({ id: user.id }, "youWillNeverKnow");
        cb(null, token);
      }
    });
  }

  static insertEpresence(input, cb) {
    let waktu = input.waktu.split(" ");
    let editWaktu = waktu[0].replace(/-/g, "/");
    let editWaktu2 = waktu[1].slice(0, 5).replace(/:/, ".");

    const inputData = `('${+input.id}', '${input.type}', '${
      editWaktu + " " + editWaktu2
    }')`;
    pool.query(Query.insertPresence(inputData), (err, res) => {
      if (err) return cb(err);

      cb(null, "success input");
    });
  }

  static getData(id_users, cb) {
    pool.query(Query.getData(id_users), (err, res) => {
      if (err) {
        console.log(err);
      } else {
        const users = res.rows;

        const data = users.map((user, i, users) => {
          const tanggal = user.waktu.split(" ")[0];
          let waktu_masuk =
            users[0].waktu.split(" ")[1].replace(".", ":") + ":00";
          let waktu_pulang =
            users[1].waktu.split(" ")[1].replace(".", ":") + ":00";
          return {
            id_user: user.id,
            nama_user: user.nama,
            tanggal,
            waktu_masuk: i == 0 ? waktu_masuk : `0${+waktu_masuk[1] + 1}:00:00`,
            waktu_pulang:
              i == 0 ? waktu_pulang : `1${+waktu_pulang[1] + 1}:00:00`,
            status_masuk: "APPROVE",
            status_pulang:
              users[1].is_approve == true || i == 1 ? "APPROVE" : "REJECT",
          };
        });
        cb(null, data);
      }
    });
  }
}

module.exports = Model;
