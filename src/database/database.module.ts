import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from '../config'
import { ConfigService } from "@nestjs/config";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";

@Module({imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('POSTGRES_DATABASE_URL'),
        entities: ['./dist/resource/**/*.entity.js'],
        synchronize: false,
        migrations: ['./dist/database/migrations/*.js'],
    }),
    inject: [ConfigService]
})]})
export class DatabaseModule {
    static forFeature (entities: EntityClassOrSchema[]) {
        return TypeOrmModule.forFeature(entities)
    }
}