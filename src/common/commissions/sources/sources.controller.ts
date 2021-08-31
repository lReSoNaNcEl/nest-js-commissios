import { ISourcesController } from "./interfaces/sources-controller.interface";
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { SourcesService } from "./sources.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateSourceDto } from "./dto/create-source.dto";
import { Source } from "./entities/Source.entity";
import { DeleteResult } from "typeorm";
import { UpdateSourceDto } from "./dto/update-category.dto";

@ApiTags('Sources Of Commission')
@Controller('sources')
export class SourcesController implements ISourcesController {

    constructor(
        private sourcesService: SourcesService
    ) {}

    @Get()
    getSources(): Promise<Source[]> {
        return this.sourcesService.getSources()
    }

    @Post()
    createSource(@Body() dto: CreateSourceDto): Promise<Source> {
        return this.sourcesService.createSource(dto)
    }

    @Put(':sourceId')
    updateSource(@Body() dto: UpdateSourceDto, @Param('sourceId', ParseIntPipe) sourceId: number): Promise<Source> {
        return this.sourcesService.updateSource(dto, sourceId)
    }

    @Delete(':sourceId')
    deleteSource(@Param('sourceId', ParseIntPipe) sourceId: number): Promise<DeleteResult> {
        return this.sourcesService.deleteSource(sourceId)
    }

}
