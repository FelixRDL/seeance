import {User} from "./User";
import {Project} from "./Project";

export interface Course {
    _id: string;
    title: string;
    description: string;
    ownerId: string;
    projects: Project[];
    projectIds: string[];
    createdAt: Date;
    updatedAt: Date;
}
