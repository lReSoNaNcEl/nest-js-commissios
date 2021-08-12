import { EntityRepository, Repository } from "typeorm";
import { Source } from "./entities/Source.entity";
import { ISourcesRepository } from "./interfaces/sources-repository.interface";

@EntityRepository(Source)
export class SourcesRepository extends Repository<Source> implements ISourcesRepository {

}
