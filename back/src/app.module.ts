import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppCommonModule } from './base/common/app-common.module';
import { Environment } from './environment/environment';

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
      entities: [],
      synchronize: true,
      extra: { timezone: "utc" },
    }),
    AppCommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private connection: Connection,
  ) {
    this.init();
    connection.subscribers.push();
  }

  private async init() {
    console.log('Node app started');
  }
}
