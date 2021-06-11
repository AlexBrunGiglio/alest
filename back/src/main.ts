import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('API template')
    .setDescription('API template description')
    .setVersion('1.0')
    .addTag('doc')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.use('/api/docs/swagger.json', (req: any, res: any) => {
    res.send(document);
  });

  SwaggerModule.setup('swagger', app, null, {
    swaggerUrl: `/api/docs/swagger.json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  });
  await app.listen(3000);
}
bootstrap();
