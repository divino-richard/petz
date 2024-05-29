'use client';

import Modal from "@/app/ui/Modal";
import { useEffect, useState } from "react";
import UploadImage from "./UploadImage";
import Separator from "@/app/ui/Separator";
import { PetCategory } from "@prisma/client";
import { useFormState, useFormStatus } from "react-dom";
import { registerPet } from "@/app/lib/actions/pet";

interface Props {
  categories: PetCategory[]
}

interface InitialState {
  error?: string,
  success?: boolean
}
const initialState: InitialState = {
  error: '',
  success: false
}
export default function RegisterPetModal({categories}:Props) {
  const [showModal, setShowModal] = useState(false);
  const [state, dispatch] = useFormState(registerPet, initialState);

  useEffect(() => {
    if(state?.success) {
      setShowModal(false);
    }
  }, [state]);

  return (
    <div>
      <button 
        className="bg-zinc-800 text-white text-[16px] py-2 px-5 hover:bg-zinc-700"
        onClick={() => setShowModal(true)}
      >
        Register Pet
      </button>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Pet Registration"
      >
        {state?.error && 
          <p className="text-red-500 text-[14px] text-center">{state.error}</p>
        }
        <form action={dispatch} className="space-y-5">
          <div className="py-5">
            <UploadImage />
          </div>
          <Separator />
          <div className="flex flex-col">
            <label 
              htmlFor="name"
              className="text-[14px] text-zinc-800"
            >
              Name
            </label>
            <input 
              type="text" 
              id="name"
              className="border border-zinc-200 p-3 rounded-lg text-[14px]"
              name="name"
            />
          </div>
          <div className="flex flex-col">
            <label 
              htmlFor="age"
              className="text-[14px] text-zinc-800"
            >
              Age
            </label>
            <input 
              type="number" 
              id="age"
              className="border border-zinc-200 p-3 rounded-lg text-[14px]"
              name="age"
              min={0}
            />
          </div>
          <div className="flex flex-col">
            <label 
              htmlFor="color"
              className="text-[14px] text-zinc-800"
            >
              Color
            </label>
            <input 
              type="text" 
              id="color"
              className="border border-zinc-200 p-3 rounded-lg text-[14px]"
              name="color"
            />
          </div>
          <div className="flex flex-col">
            <label 
              htmlFor="breed"
              className="text-[14px] text-zinc-800"
            >
              Breed
            </label>
            <input 
              type="text" 
              id="breed"
              className="border border-zinc-200 p-3 rounded-lg text-[14px]"
              name="breed"
            />
          </div>
          <div className="flex flex-col">
            <label 
              htmlFor="weight"
              className="text-[14px] text-zinc-800"
            >
              Weight (kg)
            </label>
            <input 
              type="number" 
              id="weight"
              className="border border-zinc-200 p-3 rounded-lg text-[14px]"
              name="weight"
              min={1}
            />
          </div>
          <div className="flex flex-col">
            <label 
              htmlFor="adoptationDate"
              className="text-[14px] text-zinc-800"
            >
              Adoptation Date
            </label>
            <input 
              type="date" 
              id="adoptationDate"
              className="border border-zinc-200 p-3 rounded-lg text-[14px]"
              name="adoptationDate"
            />
          </div>
          <div className="flex flex-col">
            <label 
              htmlFor="ability"
              className="text-[14px] text-zinc-800"
            >
              Ability
            </label>
            <input 
              type="text" 
              id="ability"
              className="border border-zinc-200 p-3 rounded-lg text-[14px]"
              name="ability"
            />
          </div>
          <div className="flex flex-col">
            <label 
              htmlFor="category"
              className="text-[14px] text-zinc-800"
            >
              Category
            </label>
            <select 
              name="category" 
              className="border border-zinc-200 p-3 rounded-lg text-[14px]"
            >
              <option disabled >Select category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <Separator />
          <div className="flex justify-end items-center gap-5">
            <button 
              type="button"
              className="w-fit flex items-center gap-2 text-[16px] bg-zinc-50 py-2 px-5 border border-zinc-100 hover:border-zinc-800 mt-5"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <RegisterButton />
          </div>
        </form>
      </Modal>
    </div>
  )
}

function RegisterButton() {
  const {pending} = useFormStatus();
  return (
    <button 
      type="submit"
      className="w-fit flex items-center gap-2 text-[16px]  bg-zinc-800 text-white py-2 px-5 border border-zinc-800 mt-5 hover:bg-zinc-700"
    >
      {pending ? "Loading..." : "Register"}
    </button>
  );
}
