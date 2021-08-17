import { EntityRepository, Repository } from "typeorm";
import {ReportDocument} from "./entities/ReportDocument.entity"
import { IDocumentsRepository } from "./interfaces/documents-repository.interface";

@EntityRepository(ReportDocument)
export class DocumentsRepository extends Repository<ReportDocument> implements IDocumentsRepository {

}
