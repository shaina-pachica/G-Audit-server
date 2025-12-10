import { Sequelize } from "sequelize-typescript";
import { load } from "./load";
import { Transaction } from "sequelize";
import { PostgresDialect } from "@sequelize/postgres";

export default class SequelizeDb {
  private static instance: SequelizeDb;
  private static dbClient: Sequelize;
  private static isReady: boolean;

  private constructor() {
    SequelizeDb.isReady = false;
  }

  public static async getDbInstance(): Promise<Sequelize> {
    if (!SequelizeDb.instance) {
      SequelizeDb.instance = new SequelizeDb();
      SequelizeDb.dbClient = new Sequelize(
        process.env.DATABASE || "",
        process.env.DB_USERNAME || "",
        process.env.DB_PASSWORD || "",
        {
          port: (process.env.DB_PORT as unknown as number) || 5432,
          host: process.env.DB_HOST || "localhost",
          dialect: "postgres",
          pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
          retry: {
            max: 5,
            timeout: 10000,
          },
          modelMatch: (filename, member) => {
            return filename.substring(0, filename.indexOf(".model")) === member;
          },
        }
      );

      try {
        await SequelizeDb.dbClient.authenticate();
        console.log("DB Connection has been established");
      } catch (error) {
        console.error("Unable to connect to the database", error);
        throw error;
      }

      try {
        const models = await load();
        SequelizeDb.dbClient.addModels(models);
      } catch (error) {
        console.error("Model load error:", error);
        throw error;
      }
    }

    SequelizeDb.isReady = true;
    return SequelizeDb.dbClient;
  }

  public static async close() {
    SequelizeDb.close();
  }

  public static isDbReady(): boolean {
    return SequelizeDb.isReady;
  }

  public static async transaction(
    callback: (transaction: Transaction) => Promise<any>
  ): Promise<any> {
    const sequelize = await SequelizeDb.getDbInstance();
    return sequelize.transaction(callback);
  }
}
