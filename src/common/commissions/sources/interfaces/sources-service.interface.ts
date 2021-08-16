import { Source } from "../entities/Source.entity"

export interface ISourcesService {
    getSource(sourceId: number): Promise<Source>
    getSources: () => Promise<Source[]>
}
