import { Module } from  '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './resource/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {}
