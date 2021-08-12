import { ISourcesController } from "./interfaces/sources-controller.interface";
import { Controller, Get } from "@nestjs/common";
import { SourcesService } from "./sources.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Sources Of Commission')
@Controller('sources')
export class SourcesController implements ISourcesController {

    constructor(
        private sourcesService: SourcesService
    ) {}

    @Get()
    getSources() {
        return this.sourcesService.getSources()
    }

}
