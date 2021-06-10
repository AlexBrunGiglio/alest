import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppCommonModule } from './base/common/app-common.module';

@Module({
  imports: [
    AppCommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
