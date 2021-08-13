import { Commission } from "../entities/Commission.entity";

export interface ICommissionsController {
    getCommissions: () => Promise<Commission[]>
}
