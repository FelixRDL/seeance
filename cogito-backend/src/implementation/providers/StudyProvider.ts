export class StudyProvider {

    storeEvent(author: string, eventType: string, data: any) {
        console.log(new Date().toString(), author, eventType, data)
    }
}