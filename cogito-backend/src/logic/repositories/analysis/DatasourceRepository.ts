import {AnalysisDatasource} from "../../entities/analysis/AnalysisDatasource";

export interface DatasourceRepository {
    getByName(name: string): Promise<AnalysisDatasource<any, any>>;
}
