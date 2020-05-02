export interface Mapper<InClass, OutClass> {
    map(input: InClass): OutClass;
}