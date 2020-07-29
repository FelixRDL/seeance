import {StudyEventModel} from "../../driver/models/Analysis/StudyEventModel";

export class StudyProvider {

    storeEvent(author: string, eventType: string, data: any) {
        StudyEventModel.create({
            author: author,
            type: eventType,
            value: data
        })
    }
}