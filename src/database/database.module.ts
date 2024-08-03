import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { dataSourceOptions } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => dataSourceOptions,
    }),
  ],
})
export class DatabaseModule {
  static forFeature(entities: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(entities);
  }
}
