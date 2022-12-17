import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.setGlobalPrefix("api", { exclude: [""] });

    app.enableCors();

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    // GLOBAL reflector AtGuard  // IF MODULE LEVEL USE APP_GUARD - app module automatically inject reflector
    // const reflector = new Reflector();
    // app.useGlobalGuards(new AtGuard(reflector));

    await app.listen(parseInt(process.env.PORT) || 3001);
}
bootstrap();
