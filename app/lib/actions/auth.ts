'use server';

import { cookies } from "next/headers";
import { getUserByEmail } from "../data/users";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from "@prisma/client";
import argon2 from 'argon2';

const SECRET_KEY = "E3cUD5cB7XKwWzZDaBm9JSFW03NB56Ycwi3W6Fs5zI4=";

export async function signIn(_currentState: unknown, formData: FormData) {
    try {
        const { email, password } = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        const user = await getUserByEmail(String(email));
        if(!user || !await argon2.verify(user.password, String(password))) {
            return 'Invalid email or password';
        }

        delete (user as any).password;

        const expires = 60 * 60 * 24 * 7;
        const session = await encrypt(user, expires);

        cookies().set('session', session, { maxAge: expires, httpOnly: true });

    } catch (error) {
        throw error
    }
}

export async function getSession(): Promise<User | null> {
    try {   
        const session = cookies().get('session')?.value;
        if(!session) return null;
        const decoded = await decrypt(session);
        return decoded as User;
    } catch(error) {
        throw error;
    }
}

export async function logOut() {
    try {
        cookies().delete('session');
    } catch (error) {
        throw error;
    }
}

export async function encrypt(payload: User, expiresIn: number) {
    return jwt.sign(payload, SECRET_KEY, { algorithm: 'HS256', expiresIn });
}

export async function decrypt(session: string): Promise<JwtPayload> {
    return jwt.verify(session, SECRET_KEY) as JwtPayload;
}
