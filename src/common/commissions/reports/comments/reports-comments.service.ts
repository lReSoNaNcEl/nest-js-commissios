import { ForbiddenException, Inject, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { ReportsCommentsRepository } from './reports-comments.repository';
import { IReportsCommentsService } from './interfaces/reports-comments-service.interface';
import { CreateReportCommentDto } from './dto/create-report-comment.dto';
import { UpdateReportCommentDto } from './dto/update-report-comment.dto';
import { ReportComment } from "./entities/ReportComment.entity";
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { User } from "../../../users/entities/User.entity";
import { ReportsService } from "../index/reports.service";

@Injectable({scope: Scope.REQUEST})
export class ReportsCommentsService implements IReportsCommentsService {

    constructor(
        @InjectRepository(ReportsCommentsRepository)
        private reportsCommentsRepository: ReportsCommentsRepository,
        private reportsService: ReportsService,
        @Inject(REQUEST)
        private req: Request
    ) {}

    getComment(commentId: number): Promise<ReportComment> {
        return this.reportsCommentsRepository.getComment(commentId)
    }

    async createComment(dto: CreateReportCommentDto, reportId: number): Promise<ReportComment> {
        const user: User = this.req.user
        const report = await this.reportsService.getReport(reportId)
        const comment = await this.reportsCommentsRepository.save(
            this.reportsCommentsRepository.create({...dto, author: user, report})
        )
        return this.getComment(comment.id)
    }

    async updateComment(dto: UpdateReportCommentDto, commentId: number): Promise<ReportComment> {
        let comment = await this.getComment(commentId)
        const user: User = this.req.user

        if (!comment.hasAuthor(user.id))
            throw new ForbiddenException('The comment does not belong to you')

        comment = await this.reportsCommentsRepository.save({id: comment.id, ...dto})

        return this.getComment(comment.id)
    }

    async deleteComment(commentId: number): Promise<any> {
        const user: User = this.req.user
        const comment = await this.getComment(commentId)

        if (!comment.hasAuthor(user.id))
            throw new ForbiddenException('The comment does not belong to you')

        return this.reportsCommentsRepository.delete(commentId)
    }

}
