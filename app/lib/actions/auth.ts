'use server';

import { cookies } from "next/headers";
import { getUserByEmail } from "../data/users";
import { User } from "../storage";
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = "E3cUD5cB7XKwWzZDaBm9JSFW03NB56Ycwi3W6Fs5zI4=";

export async function signIn(_currentState: unknown, formData: FormData) {
    try {
        const { email, password } = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        const user = await getUserByEmail(String(email));
        if(!user || String(password) !== user.password) {
            return 'Invalid email or password';
        }

        const expires = 60 * 60 * 24 * 7;
        const session = await encrypt(user, expires);

        cookies().set('session', session, { maxAge: expires, httpOnly: true });

    } catch (error) {
        throw error
    }
}

export async function getSession() {
    try {   
        const session = cookies().get('session')?.value;
        const decoded = await decrypt(session ?? '');
        return decoded;
    } catch(error) {
        throw error;
    }
} 

export async function encrypt(payload: User, expiresIn: number) {
    return jwt.sign(payload, SECRET_KEY, { algorithm: 'HS256', expiresIn });
}

export async function decrypt(session: string): Promise<JwtPayload> {
    return jwt.verify(session, SECRET_KEY) as JwtPayload;
}
