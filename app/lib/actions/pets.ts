'use server';

import { Pet } from "@prisma/client";

// export async function createPet(data: Pet) {
//     pets.push(data)
// }

// export async function updatePet(id: number, data: Pet) {
//     const petIndex = pets.findIndex(pet => pet.id === id);
//     if(petIndex !== -1) {
//         pets[petIndex] = {...pets[petIndex], ...data};
//     }
// }

// export async function deletePet(id: number) {
//     const petIndex = pets.findIndex(pet => pet.id === id);
//     if(petIndex !== -1) {
//         pets.splice(petIndex, 1);
//     }
// }