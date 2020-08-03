import {User} from "../../entities/User";
import {UserRepository} from "../../repositories/UserRepository";

export async function ExistsUserWithId(id: string, userManager: UserRepository): Promise<boolean> {
    try {
        return userManager.existsUserWithId(id);
    } catch(e) {
        return Promise.reject(e);
    }
}