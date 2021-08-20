import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ReportReviewGuard } from "./report-review.guard";

export const ReportReviewAccess = () => UseGuards(
    AuthGuard('jwt'),
    new ReportReviewGuard()
)
