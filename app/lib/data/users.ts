import { users } from "../storage";

export async function getUserByEmail(email: string) {
    return users.find(user => user.email === email);
}