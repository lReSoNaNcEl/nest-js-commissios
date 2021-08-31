import { EntityRepository, Repository } from "typeorm";
import { Source } from "./entities/Source.entity";
import { ISourcesRepository } from "./interfaces/sources-repository.interface";
import { NotFoundException } from "@nestjs/common";

@EntityRepository(Source)
export class SourcesRepository extends Repository<Source> implements ISourcesRepository {

    async getSource(sourceId: number): Promise<Source> {
        const source = await this.findOne({where: {id: sourceId}})
        if (!source) throw new NotFoundException(`Source with ID ${sourceId} don\`t exists in database` )
        return source
    }

}
