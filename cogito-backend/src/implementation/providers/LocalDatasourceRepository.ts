import {DatasourceRepository} from "../../logic/repositories/analysis/DatasourceRepository";
import {AnalysisDatasource} from "../../logic/entities/analysis/AnalysisDatasource";

import * as datasources from './datasources';

export class LocalDatasourceRepository implements DatasourceRepository {

    private sources: AnalysisDatasource<any, any>[] = [new datasources.CommitsDatasource(), new datasources.UsersDatasource()];

    constructor() {
        // instantiate all datasources
        this.sources = Object.keys(datasources).map((key) => {
            // @ts-ignore
            return new datasources[key]();
        });
    }

    getByName(name: string): Promise<AnalysisDatasource<any, any>> {
        const result = this.sources.find(el => el.key === name);
        if (!result) {
            return Promise.reject("Source not found by name " + name);
        } else {
            return Promise.resolve(result);
        }
    }
}