import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {Swagger} from "./core/swagger"
import { ValidationPipe } from "@nestjs/common"
import * as NodeCache from 'node-cache'

export const cache = new NodeCache({stdTTL: 5})


async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: {origin: '*'}})

    app.setGlobalPrefix('api')
    app.useGlobalPipes(new ValidationPipe({transform: true}))
    app.enableShutdownHooks()
    Swagger.use(app)

    await app.listen(process.env.PORT || 3000).then(() => {
        console.log(`Server listening port ${process.env.PORT || 3000}`)
    })
}

bootstrap();
