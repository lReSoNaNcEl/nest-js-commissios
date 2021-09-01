import { CreateReportCommentDto } from "../dto/create-report-comment.dto";
import { ReportComment } from "../entities/ReportComment.entity";
import { UpdateReportCommentDto } from "../dto/update-report-comment.dto";
import { DeleteResult } from "typeorm";

export class IReportsCommentsController {
    createComment: (dto: CreateReportCommentDto, reportId: number) => Promise<ReportComment>
    updateComment: (dto: UpdateReportCommentDto, commentId: number) => Promise<ReportComment>
    deleteComment: (commentId: number) => Promise<DeleteResult>
}
