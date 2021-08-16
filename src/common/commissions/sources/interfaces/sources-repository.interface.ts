import { Source } from "../entities/Source.entity";

export interface ISourcesRepository {
    getSource(sourceId: number): Promise<Source>
}
