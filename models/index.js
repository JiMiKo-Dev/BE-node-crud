require("dotenv").config(); 
const { Sequelize } = require("sequelize");

// setting sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    dialect: "postgres",
  }
);

// check connection DB
sequelize
  .authenticate()
  .then(() => console.log(`DB connected`))
  .catch((err) => console.error("Unable to connect to the database:", err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./users.model")(sequelize, Sequelize.DataTypes);

module.exports = db;
