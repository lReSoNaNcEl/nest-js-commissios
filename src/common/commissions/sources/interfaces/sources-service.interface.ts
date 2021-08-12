import { Source } from "../entities/Source.entity"

export interface ISourcesService {
    getSources: () => Promise<Source[]>
}
