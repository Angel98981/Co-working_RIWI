import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ReservationsModule } from './reservations/reservations.module';
import { SessionsModule } from './sessions/sessions.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    RoomsModule,
    WorkspacesModule,
    ReservationsModule,
    SessionsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 3,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
