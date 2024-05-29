'use server';

import { cookies } from "next/headers";
import { getUserByEmail } from "../data/users";
import argon2 from 'argon2';
import { encrypt } from "@/utils/auth.utils";

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
        const session = encrypt(user, expires);
        cookies().set('session', session, { maxAge: expires, httpOnly: true });

    } catch (error) {
        throw error
    }
}

export async function logOut() {
    try {
        cookies().delete('session');
    } catch (error) {
        throw error;
    }
}
