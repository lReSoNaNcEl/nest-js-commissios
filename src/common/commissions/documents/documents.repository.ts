import { EntityRepository, Repository } from "typeorm";
import { CommissionDocument } from "./entities/CommissionDocument.entity";
import { IDocumentsRepository } from "./interfaces/documents-repository.interface";

@EntityRepository(CommissionDocument)
export class DocumentsRepository extends Repository<CommissionDocument> implements IDocumentsRepository {

}
