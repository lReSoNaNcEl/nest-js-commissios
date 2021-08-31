import { Source } from "../entities/Source.entity"
import { CreateSourceDto } from "../dto/create-source.dto";
import { UpdateSourceDto } from "../dto/update-category.dto";
import { DeleteResult } from "typeorm";

export interface ISourcesService {
    getSource: (sourceId: number) => Promise<Source>
    getSources: () => Promise<Source[]>
    createSource: (dto: CreateSourceDto) => Promise<Source>
    updateSource: (dto: UpdateSourceDto, sourceId: number) => Promise<Source>
    deleteSource: (sourceId: number) => Promise<DeleteResult>
}
