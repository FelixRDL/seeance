import {User} from "../../entities/User";
import {UserRepository} from "../../repositories/UserRepository";

export async function CreateUser(user: User, userManager: UserRepository): Promise<User> {
    try {
        const isExisting: boolean = await userManager.existsUserWithId(user.id);
        if(isExisting) {
            return Promise.reject(new UserWithIdAlreadyExistingError());
        } else {
            return userManager.createUser(user);
        }
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

export class UserWithIdAlreadyExistingError extends Error {
    constructor() {
        super();
        this.message = "User with id is already existing!";
    }
}