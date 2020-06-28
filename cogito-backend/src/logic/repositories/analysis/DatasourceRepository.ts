import {DatasourceTemplate} from "../../entities/components/DatasourceTemplate";

export interface DatasourceRepository {
    getDatasources(nameContains?: string): Promise<DatasourceTemplate[]>;
    getDatasourceByName(name: string): Promise<DatasourceTemplate>;
}