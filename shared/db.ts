import { DataSource } from "typeorm";
import { Equipment } from "../core/entities/equipment.entity";
import { User } from "../core/entities/user.entity";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Equipment],
  logging: false,
  synchronize: true,
});
