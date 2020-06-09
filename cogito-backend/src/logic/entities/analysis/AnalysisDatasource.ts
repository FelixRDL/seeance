export interface AnalysisDatasource<RequestType, OutputType> {
    getData(req: RequestType): Promise<OutputType>;
}