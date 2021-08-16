import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ReportsService } from "./reports.service";
import { IReportsController } from "./interfaces/reports-controller.interface";

@ApiTags('Reports Of Commissions')
@Controller('commissions/reports')
export class ReportsController implements IReportsController {

    constructor(
        private reportsService: ReportsService
    ) {}

}
