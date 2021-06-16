import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { ReferentialController } from './base/controllers/referential.controller';
import { ReferentialService } from './base/services/referential.service';
import { Environment } from './environment/environment';
import { AppType } from './modules/app-values/app-type.entity';
import { AppValue } from './modules/app-values/app-value.entity';
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
    TypeOrmModule.forFeature([
      AppValue,
      AppType,
    ]),
    UsersModule
  ],
  controllers: [
    AppController,
    ReferentialController
  ],
  providers: [
    ReferentialService,
  ]
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
