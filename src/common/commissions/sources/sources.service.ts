import { Injectable } from "@nestjs/common";
import { SourcesRepository } from "./sources.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { ISourcesService } from "./interfaces/sources-service.interface";
import { Source } from "./entities/Source.entity";

@Injectable()
export class SourcesService implements ISourcesService {

    constructor(
        @InjectRepository(SourcesRepository)
        private sourcesRepository: SourcesRepository
    ) {}

    getSources(): Promise<Source[]> {
        return this.sourcesRepository.find()
    }

    getSource(sourceId: number): Promise<Source> {
        return this.sourcesRepository.getSource(sourceId)
    }

}
