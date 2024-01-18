import { Sequelize, Dialect } from "sequelize";
import config from "../config/config.json";

const env = process.env.NODE_ENV || "development";

let host = process.env.DEV_DATABASE_HOST;
let password = process.env.DEV_DATABASE_PASSWORD;
if (env === "production") {
  host = process.env.PROD_DATABASE_HOST;
  password = process.env.PROD_DATABASE_PASSWORD;
}

const { dialect, database, username } = config[env as keyof typeof config];

const FullSequelize = new Sequelize(database, username, password, {
  host,
  dialect: dialect as Dialect | undefined,
  dialectModule: require("mysql2"),
});

export default FullSequelize;
