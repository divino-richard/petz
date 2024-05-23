export interface Pet {
    id?: number;
    name: string;
    age: number;
    color: string;
    type: string;
}
export const pets: Pet[] = [];

export interface User {
    id?: number;
    email: string;
    password: string;
}
export const users: User[] = [
    {
        id: 1,
        email: 'richard@gmail.com',
        password: 'Password@123'
    }
];