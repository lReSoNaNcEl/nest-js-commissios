import { IsOptional, IsString } from "class-validator";
import {ApiProperty} from '@nestjs/swagger'
import * as faker from 'faker'

export class UpdateReportCommentDto {
    @ApiProperty({example: faker.lorem.text()})
    @IsString()
    @IsOptional()
    title: string
}
