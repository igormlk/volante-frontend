import { Sequelize } from "sequelize";
import sqlite3 from "sqlite3";

const db = new Sequelize({
  storage: './database.db',
  dialect: 'sqlite',
  dialectModule: sqlite3
});

export default db