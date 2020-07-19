import {UserRepository} from "../../repositories/UserRepository";

export async function RegisterProjectVisit(req: RegisterProjectVisitRequest, userManager: UserRepository): Promise<void> {
    try {
        return userManager.registerProjectVisit(
            req.userId,
            req.url,
            req.courseName,
            req.projectName
        );
    } catch(e) {
        return Promise.reject(e);
    }
}

export interface RegisterProjectVisitRequest {
    userId: string,
    url: string,
    courseName: string,
    projectName: string
}