// import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { config } from 'dotenv';

config();
export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_DATABASE_URL,
  entities: ['./dist/resource/**/*.entity.js'],
  synchronize: false,
  migrations: ['./dist/database/migrations/*.js'],
  seeds: ['./dist/database/seeds/**/*.js'],
  factories: ['./dist/database/factories/**/*.js'],
};

export default new DataSource(dataSourceOptions);
