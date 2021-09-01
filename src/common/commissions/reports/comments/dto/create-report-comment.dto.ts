import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from '@nestjs/swagger'
import * as faker from 'faker'

export class CreateReportCommentDto {

    @ApiProperty({example: faker.lorem.text()})
    @IsString()
    @IsNotEmpty()
    title: string

}
