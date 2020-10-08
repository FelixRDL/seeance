import {DatasourceTemplate} from "../../entities/components/DatasourceTemplate";

export interface DatasourceTemplateRepository {
    getDatasources(nameContains?: string): Promise<DatasourceTemplate[]>;
    getDatasourceByName(name: string): Promise<DatasourceTemplate>;
}