import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SourcesRepository } from "./sources.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { ISourcesService } from "./interfaces/sources-service.interface";
import { Source } from "./entities/Source.entity";
import { CreateSourceDto } from "./dto/create-source.dto";
import { UpdateSourceDto } from "./dto/update-category.dto";
import { DeleteResult } from "typeorm";

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

    async createSource(dto: CreateSourceDto): Promise<Source> {
        const source = await this.sourcesRepository.findOne({...dto})

        if (source) throw new HttpException(`Source already exists`, HttpStatus.CONFLICT)

        return this.sourcesRepository.save(
            this.sourcesRepository.create({...dto})
        )
    }

    async updateSource(dto: UpdateSourceDto, sourceId: number): Promise<Source> {
        const source = await this.getSource(sourceId)
        return this.sourcesRepository.save({id: source.id, ...dto})
    }

    deleteSource(sourceId: number): Promise<DeleteResult> {
        return this.sourcesRepository.delete(sourceId)
    }

}
