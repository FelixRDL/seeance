import {User} from "../entities/User";

export interface UserRepository {
    createUser(user: User): Promise<User>;
    existsUserWithId(id: string): Promise<boolean>;
    getUserWithId(id: string): Promise<User>;
    getUserAutocomplete(q:string): Promise<User[]>;
    deleteByUserId(userId: string): Promise<void>;
    registerProjectVisit(userId: string, url: string, courseName: string, projectName: string): Promise<void>;
}