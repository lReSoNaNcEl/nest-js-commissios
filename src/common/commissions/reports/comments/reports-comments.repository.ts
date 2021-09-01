import {EntityRepository, Repository} from 'typeorm'
import { IReportsCommentsRepository, } from "./interfaces/reports-comments-repository.interface";
import { NotFoundException } from '@nestjs/common';
import {ReportComment} from "./entities/ReportComment.entity";

@EntityRepository(ReportComment)
export class ReportsCommentsRepository extends Repository<ReportComment> implements IReportsCommentsRepository {

    async getComment(commentId: number) {
        const comment = await this.findOne({ where: {id: commentId}, })
        if (!comment) throw new NotFoundException(`Comment of report with ID ${commentId} not found!`)
        return comment
    }

}
