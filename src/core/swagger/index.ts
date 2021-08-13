import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import {INestApplication} from '@nestjs/common'

export class Swagger {

    public static config = new DocumentBuilder()
        .setTitle('Api Docs')
        .setDescription('ITC API')
        .setVersion('1.0')
        .addBearerAuth({type: 'http', scheme: 'Bearer', bearerFormat: 'Bearer'})
        .build()

    public static use(app: INestApplication) {
        const document = SwaggerModule.createDocument(app, this.config)
        SwaggerModule.setup('swagger', app, document)
    }

}
