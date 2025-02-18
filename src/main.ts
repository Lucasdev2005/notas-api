import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /** enable requests from another domains. */
  app.enableCors();

  /** enable global validation with class-validator. */
  app.useGlobalPipes(new ValidationPipe());

  /** setup Swagger. */
  const config = new DocumentBuilder()
    .setTitle("Notas API")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
      },
      "auth",
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("swagger", app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
