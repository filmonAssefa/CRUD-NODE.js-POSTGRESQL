import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

class Database {
  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      // Add some reasonable defaults for production
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    this.pool.on("connect", () => {
      console.log("Database connected successfully");
    });

    this.pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
      process.exit(-1);
    });
  }

  query(text, params) {
    return this.pool.query(text, params);
  }
}

export default new Database().pool;
