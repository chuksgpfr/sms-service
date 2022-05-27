// import { Dialect, Sequelize } from 'sequelize'
import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
import { Account } from "./models/Account";
import { PhoneNumber } from "./models/PhoneNumber";


dotenv.config();

const POSTGRES_URL = process.env.POSTGRES_URL as string;

const POSTGRES_USERNAME = process.env.POSTGRES_USERNAME as string;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;
const POSTGRES_HOST = process.env.POSTGRES_HOST as string;
const POSTGRES_DBNAME = process.env.POSTGRES_DBNAME as string;

// const sequelizeConnection = new Sequelize(POSTGRES_URL);

// export default sequelizeConnection;



const connection = new Sequelize({
  dialect: "postgres",
  host: POSTGRES_HOST,
  username: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DBNAME,
  logging: false,
  models: [Account, PhoneNumber],
});

export default connection;
