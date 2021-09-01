import {CreateReportCommentDto} from '../dto/create-report-comment.dto'
import {UpdateReportCommentDto} from '../dto/update-report-comment.dto'
import { ReportComment } from "../entities/ReportComment.entity";
import { DeleteResult } from "typeorm";

export interface IReportsCommentsService {
    getComment: (commentId: number) => Promise<ReportComment>
    createComment: (dto: CreateReportCommentDto, reportId: number) => Promise<ReportComment>
    updateComment: (dto: UpdateReportCommentDto, commentId: number) => Promise<ReportComment>
    deleteComment: (commentId: number) => Promise<DeleteResult>
}
