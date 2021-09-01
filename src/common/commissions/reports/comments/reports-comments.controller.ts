import {Controller, Delete, Post, Put, Body, Param, ParseIntPipe} from '@nestjs/common'
import {ApiTags} from '@nestjs/swagger'
import {CreateReportCommentDto} from './dto/create-report-comment.dto'
import { ReportsCommentsService } from "./reports-comments.service";
import {UpdateReportCommentDto} from './dto/update-report-comment.dto'
import { IReportsCommentsController } from "./interfaces/reports-comments-controller.interface";
import { Auth } from "../../../auth/auth.decorator";
import { Roles } from "../../../users/interfaces/user.interface";
import { ReportComment } from "./entities/ReportComment.entity";

@ApiTags('Comments of Report')
@Controller('reports/:reportId/comments')
export class ReportsCommentsController implements IReportsCommentsController {

    constructor(
        private reportsCommentsService: ReportsCommentsService
    ) {}

    @Auth(Roles.ADMIN)
    @Post()
    createComment(@Body() dto: CreateReportCommentDto, @Param('reportId',ParseIntPipe) reportId: number): Promise<ReportComment> {
        return this.reportsCommentsService.createComment(dto, reportId)
    }

    @Auth(Roles.ADMIN)
    @Put(':commentId')
    updateComment(@Body() dto: UpdateReportCommentDto, @Param('commentId', ParseIntPipe) commentId: number): Promise<ReportComment> {
        return this.reportsCommentsService.updateComment(dto, commentId)
    }

    @Auth(Roles.ADMIN)
    @Delete(':commentId')
    deleteComment(@Param('commentId', ParseIntPipe) commentId: number) {
        return this.reportsCommentsService.deleteComment(commentId)
    }

}
