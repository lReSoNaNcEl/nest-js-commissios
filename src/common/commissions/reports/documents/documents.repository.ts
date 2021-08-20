import { EntityRepository, Repository } from "typeorm";
import {ReportDocument} from "./entities/ReportDocument.entity"
import { IDocumentsRepository } from "./interfaces/documents-repository.interface";
import { NotFoundException } from "@nestjs/common";

@EntityRepository(ReportDocument)
export class DocumentsRepository extends Repository<ReportDocument> implements IDocumentsRepository {

    async getDocument(documentId: number): Promise<ReportDocument> {
        const document = await this.findOne({id: documentId})
        if (!document) throw new NotFoundException(`Document with ID ${documentId} don\`t exists`)
        return document
    }

}
