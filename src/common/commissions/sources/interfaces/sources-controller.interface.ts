import { Source } from "../entities/Source.entity"
import { DeleteResult } from "typeorm";
import { UpdateSourceDto } from "../dto/update-category.dto";
import { CreateSourceDto } from "../dto/create-source.dto";

export interface ISourcesController {
    getSources: () => Promise<Source[]>
    createSource: (dto: CreateSourceDto) => Promise<Source>
    updateSource: (dto: UpdateSourceDto, sourceId: number) => Promise<Source>
    deleteSource: (sourceId: number) => Promise<DeleteResult>
}
