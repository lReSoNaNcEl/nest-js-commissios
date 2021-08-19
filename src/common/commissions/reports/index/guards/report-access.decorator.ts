import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ReportGuard } from "./report.guard";

export const ReportAccess = () => UseGuards(
    AuthGuard('jwt'),
    new ReportGuard()
)
