import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import * as SwaggerUI from 'swagger-ui-dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('main');
  const port = process.env.port || 3000;

  const configApi = new DocumentBuilder()
    .setTitle('API Sistema de Citas Medicas')
    .setDescription('API para el sistema de citas medicas')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configApi);
  SwaggerModule.setup('api', app, document, {
    customCss: `
      .swagger-ui {
        background-color: #333;
        color: #fff;
      }
      .swagger-ui .topbar {
        background-color: #282c34;
      }
      .swagger-ui .markdown p,
      .swagger-ui .info p,
      .swagger-ui .info h1,
      .swagger-ui .info h2,
      .swagger-ui .info h3,
      .swagger-ui .info h4,
      .swagger-ui .info h5,
      .swagger-ui .info h6,
      .swagger-ui .info .title,
      .swagger-ui span,
      .swagger-ui td,
      .swagger-ui svg,
      .swagger-ui .model-title,
      .swagger-ui .model .property.primitive {
        color: #fff;
      }
      .swagger-ui .opblock-section-header {
        color: #d9d9d9
      }
    `,
    //customCssUrl: SwaggerUI.getAbsoluteFSPath(),
  });

  app
    .listen(port)
    .then(() => {
      logger.log(`Server running on http://localhost:${port}`);
    })
    .catch((error) => {
      logger.error(`Error starting the server: ${error}`);
    });
}
bootstrap();
