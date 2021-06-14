import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { Environment } from './environment/environment';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: Environment.db_host,
      port: 3306,
      username: Environment.db_user,
      password: Environment.db_password,
      database: Environment.db_name,
      logging: Environment.db_log_enabled,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      extra: { timezone: "utc" },
    }),
    UsersModule
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor(
    private connection: Connection,
  ) {
    this.init();
    this.connection.subscribers.push();
  }

  private async init() {
    console.log('Node app started');
  }
}
