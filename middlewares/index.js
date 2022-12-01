const Query = require("../models/queries");
const jwt = require("jsonwebtoken");
const { pool } = require("../config");

const authentication = async (req, res, next) => {
  try {
    const { token } = req.headers;
    let user;
    if (!token) throw { name: "invalid_token" };

    const payload = jwt.verify(token, "youWillNeverKnow");

    pool.query(Query.findByPk(payload.id), (err, res) => {
      if (err) {
        next(err);
      } else {
        user = res.rows[0];
        if (!user) throw { name: "invalid_token" };
      }
    });

    req.user = {
      id: payload.id,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: error.name });
  }
};

const authorization = (req, res, next) => {
  try {
    const { id } = req.user;
    const { id_users } = req.params;

    pool.query(Query.findByPk(id), (err, res) => {
      if (err) {
        next(err);
      } else {
        const spv = res.rows[0];
        pool.query(Query.findByPk(id_users), (error, resp) => {
          if (error) {
            throw error;
          } else {
            const user = resp.rows[0];
            if (resp.rows == 0) {
              throw { name: "user_not_found" };
            }
            if (spv.npp != user.npp_supervisor) {
              throw { name: "forbidden" };
            }
          }
          next();
        });
      }
    });
  } catch (error) {
    res.status(403).json({ message: "forbidden" });
  }
};

module.exports = { authentication, authorization };
