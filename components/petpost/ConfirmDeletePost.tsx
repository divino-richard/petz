'use client';

import { useEffect, useState } from "react";
import Popup from "../ui/Popup";
import { IoMdTrash } from "react-icons/io";
import Button from "../ui/Button";
import { useFormState, useFormStatus } from "react-dom";
import { deletePetPost } from "@/lib/actions/petpost";

interface FormState {
  error?: string;
  success?: boolean;
}

const initialState: FormState = {
  error: '',
  success: false
}

interface Props {
  postId: string;
}

export default function ConfirmDeletePost({postId}: Props) {
  const [showPopup, setShowPopup] = useState(false);
  const [state, dispatch] = useFormState(deletePetPost, initialState);
  const { pending } = useFormStatus();

  useEffect(() => {
    if(state?.success) {
      setShowPopup(false);
    }
  }, [state.success]);

  return (
    <div>
      <button 
        onClick={() => setShowPopup(true)}
        className="w-full flex items-center gap-2 px-5 py-2 border border-zinc-100 bg-zinc-50"
      >
        <IoMdTrash />
        <span>Delete</span>
      </button>
      <Popup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        title="Confirm Delete Post"
      >
        <div className="w-[400px] space-y-10">
          <div>
            <h1 className="text-[16px]">
              Are you sure you want delete?
            </h1>
            <p className="text-[14px] text-zinc-800">This post will be permanently deleted.</p>
          </div>
          <form action={dispatch}>
            <input type="hidden" name="postId" value={postId}/>
            <div className="flex gap-2 items-center justify-end">
              <Button 
                htmlType="button"
                onClick={() => setShowPopup(false)}
                title="Cancel"
                type="no-fill"
              />
              <Button 
                htmlType="submit"
                onClick={() => console.log('Click')}
                title={pending ? "Deleting..." : "Confirm"}
                type="fill"
              />
            </div>
          </form>
          {state.error && <p className="text-[12px] text-red-500">
            {state.error}
          </p>}
        </div>
      </Popup>
    </div>
  )
}