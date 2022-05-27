import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import smsRoute from './src/routes/smsRoute';
import connection from "./src/db/config";
import client from "./src/config/redis";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json())

app.use(smsRoute());

const start = async (): Promise<void> => {
  try {
    await connection.sync();
    await client.connect();
    app.listen(port, () => {
      console.log(`Server is running at location http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();

process.on("SIGINT", function () {
	console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
	// some other closing procedures go here
	process.exit(0);
});
