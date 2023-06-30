import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  app.setGlobalPrefix(process.env.APP_BASE_URL);
  app.enableCors({
    exposedHeaders:
      "x-pagination-page, x-pagination-page-size,x-pagination-total",
  });
app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle("Job Finder API")
    .setDescription("The job finder API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/docs", app, document, {
    swaggerOptions: {
      displayOperationId: true,
      persistAuthorization: true,
    },
    customSiteTitle: "Job Finder service",
  });
  await app.listen(process.env.APP_PORT);
}

bootstrap()
  .then(() => {
    console.info(
      `App is running on port ${process.env.APP_PORT} with baseURL=${process.env.APP_BASE_URL}`
    );
    console.info(
      `App swagger document is running on port ${process.env.APP_PORT} with baseURL=${process.env.DOC_BASE_URL}`
    );
  })
  .catch((e) => {
    console.error(e);
    console.info(`App exiting....`);
    process.exit(-1);
  });
