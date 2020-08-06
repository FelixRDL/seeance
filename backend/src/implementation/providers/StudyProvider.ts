import {StudyEventModel} from "../../driver/models/Analysis/StudyEventModel";
import * as fs from "fs";


export class StudyProvider {

    constructor() {
        StudyEventModel.find({}).then((data: any[]) => {
            fs.writeFileSync('/usr/log.json', JSON.stringify(data, undefined, 2))
            console.log(`Wrote ${data.length} items`)
        })
    }

    storeEvent(author: string, eventType: string, data: any) {
        StudyEventModel.create({
            author: author,
            type: eventType,
            value: data
        })
    }
}