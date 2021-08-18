import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ReportReviewGuard } from "./report-review.guard";

export const ReportsReviewAccess = () => UseGuards(
    AuthGuard('jwt'),
    new ReportReviewGuard()
)
