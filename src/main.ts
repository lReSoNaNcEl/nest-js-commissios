import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {Swagger} from "./core/swagger"
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api')
    app.useGlobalPipes(new ValidationPipe({transform: true}))
    app.enableShutdownHooks()
    Swagger.use(app)
    await app.listen(process.env.PORT || 3000)
}

bootstrap();
