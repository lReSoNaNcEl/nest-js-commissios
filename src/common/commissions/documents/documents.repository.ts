import { EntityRepository, Repository } from "typeorm";
import { CommissionDocument } from "./entities/CommissionDocument.entity";
import { IDocumentsRepository } from "./interfaces/documents-repository.interface";
import { NotFoundException } from "@nestjs/common"

@EntityRepository(CommissionDocument)
export class DocumentsRepository extends Repository<CommissionDocument> implements IDocumentsRepository {

    async getDocument(documentId: number): Promise<CommissionDocument> {
        const document = await this.findOne({id: documentId})
        if (!document) throw new NotFoundException(`Document with ID ${documentId} don\`t exists`)
        return document
    }

}
