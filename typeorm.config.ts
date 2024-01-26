import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import { Todo } from "src/todos/entities/todo.entity";

dotenv.config();

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: "mariadb",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Todo],
  synchronize: true,
  logging: true
}