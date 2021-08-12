import { Source } from "../entities/Source.entity"
import { SourcesService } from "../sources.service";

export interface ISourcesController {
    getSources: () => Promise<Source[]>
}
