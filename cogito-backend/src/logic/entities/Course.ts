import {User} from "./User";

export interface Course {
    _id: string;
    title: string;
    owner: User;
    createdAt: Date;
    updatedAt: Date;
}