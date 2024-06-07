'use client';

import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import UploadImages from "../ui/UploadImages";
import { useFormState, useFormStatus } from "react-dom";
import Separator from "../ui/Separator";
import { createPetPost } from "@/lib/actions/petpost";

interface Props {
  petId: string;
}

interface InitialState {
  error?: string;
  success?: boolean;
}

const initialState: InitialState = {
  error: '',
  success: false
}

export default function CreatePetPostModal({petId}:Props) {
  const [showModal, setShowModal] = useState(false);
  const [state, dispatch] = useFormState(createPetPost, initialState);

  useEffect(() => {
    if(state.success) {
      setShowModal(false);
    }
  }, [state]);

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div>
      <button 
        className="bg-zinc-800 text-white text-[16px] py-2 px-5 hover:bg-zinc-700"
        onClick={() => setShowModal(true)}
      >
        Create Post
      </button>

      <Modal
        title="Create pet post"
        show={showModal}
        onClose={closeModal}
      > 
        <form action={dispatch} className="py-5 space-y-5">
          {state?.error && 
            <p className="text-red-500 text-[14px] text-center">{state.error}</p>
          }

          <input type="hidden" name="petId" value={petId}/>

          <div className="flex flex-col">
            <label 
              htmlFor="caption"
              className="text-[14px] text-zinc-800"
            >
              Caption
            </label>
            <input 
              type="text" 
              id="caption"
              className="border border-zinc-200 p-3 rounded-lg text-[14px]"
              name="caption"
              placeholder="Write the caption here"
            />
          </div>
          <UploadImages name="petImages" />
          
          <Separator />

          <div className="flex justify-end gap-5">
            <button 
              type="button"
              className="w-fit flex items-center gap-2 text-[16px] text-zinc-800 py-2 px-5 border border-zinc-800 mt-5 hover:bg-zinc-800 hover:text-white"
              onClick={closeModal}
            >
              Cancel
            </button>
            <PostButton />
          </div>
        </form>
      </Modal>
    </div>
  )
}

function PostButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit"
      className="w-fit flex items-center gap-2 text-[16px]  bg-zinc-800 text-white py-2 px-5 border border-zinc-800 mt-5 hover:bg-zinc-700"
    >
      {pending ? 'Pending...' : 'Submit'}
    </button>
  )
}