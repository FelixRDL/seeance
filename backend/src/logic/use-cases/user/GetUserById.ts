import {User} from "../../entities/User";
import {UserRepository} from "../../repositories/UserRepository";

export async function GetUserById(id: string, userManager: UserRepository): Promise<User> {
    try {
        return userManager.getUserWithId(id);
    } catch(e) {
        return Promise.reject(e);
    }
}