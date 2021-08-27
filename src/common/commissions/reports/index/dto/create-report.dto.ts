import { ApiProperty } from "@nestjs/swagger";
import * as faker from "faker";
import { IsNotEmpty, IsNumber} from "class-validator";

export class CreateReportDto {

    @ApiProperty({example: faker.datatype.number(20)})
    @IsNumber()
    @IsNotEmpty()
    userId: number

    @ApiProperty({example: faker.datatype.number(20), required: false})
    @IsNumber()
    @IsNotEmpty()
    commissionId: number
}
