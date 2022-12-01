const { pool } = require("../config");
const bcrypt = require("bcryptjs");
const users = require("../data/db.json")
  .users.map((el) => {
    return `('${el.nama}', '${el.email}' , '${el.npp}', '${
      el.npp_supervisor
    }', '${bcrypt.hashSync(el.password, 8)}')`;
  })
  .join(",");

const inserUsers = `INSERT INTO "Users"("nama", "email", "npp", "npp_supervisor", "password") VALUES ${users}`;

pool.query(inserUsers, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("sukses seeding Users table");
  }
});
