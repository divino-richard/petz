'use client';

import EditProfileButton from "@/components/EditProfileButton";
import Modal from "@/app/ui/Modal";
import { useState } from "react"
import { User } from "@prisma/client";
import UploadAvatar from "./UploadAvatar";
import Separator from "@/app/ui/Separator";
import { useFormState, useFormStatus } from "react-dom";
import { updateProfile } from "@/app/lib/actions/user";

interface Props {
  user: User;
}
export default function EditProfileModal({user}:Props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [errorMessage, dispatch] = useFormState(updateProfile, undefined);
  const {pending} = useFormStatus();
  const [avatarUrl, setAvatarUrl] = useState('');

  return (
    <div>
      <EditProfileButton onClick={() => setShowEditModal(true)}/>
      <Modal
        title="Edit profile"
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        <form action={dispatch} className="py-5 space-y-5">
          <div className="flex gap-5">
            <UploadAvatar 
              onUploadSuccess={(imageUrl) => setAvatarUrl(imageUrl)}
            />
          </div>
          <Separator />
          <div className="flex flex-col">
            <label 
              htmlFor="firstName"
              className="text-[14px] text-zinc-800"
            >
              First name
            </label>
            <input 
              type="text" 
              id="firstName"
              className="border border-zinc-200 p-3 rounded-lg text-[14px]"
              name="firstName"
              defaultValue={user.firstName}
            />
          </div>
          <div className="flex flex-col">
            <label 
              htmlFor="lastName"
              className="text-[14px] text-zinc-800"
            >
              Last name
            </label>
            <input 
              type="text" 
              id="lastName"
              className="border border-zinc-200 p-3 rounded-lg text-[14px]"
              name="lastName"
              defaultValue={user.lastName}
            />
          </div>
          <div className="flex flex-col">
            <label 
              htmlFor="userName"
              className="text-[14px] text-zinc-800"
            >
              User name
            </label>
            <input 
              type="text" 
              id="userName"
              className="border border-zinc-200 p-3 rounded-lg text-[14px]"
              name="username"
              defaultValue={user.username}
            />
          </div>
          <div className="flex flex-col">
            <label 
              htmlFor="bio"
              className="text-[14px] text-zinc-800"
            >
              Bio
            </label>
            <textarea 
              id="bio"
              className="border border-zinc-200 p-3 rounded-lg text-[14px] h-[150px]"
              name="bio"
              defaultValue={user?.bio ?? ''}
            />
          </div>
          <Separator />
          <div className="flex justify-end items-center gap-5">
            <button 
              type="button"
              className="w-fit flex items-center gap-2 text-[16px] bg-zinc-50 py-2 px-5 border border-zinc-100 hover:border-zinc-800 mt-5"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="w-fit flex items-center gap-2 text-[16px]  bg-zinc-800 text-white py-2 px-5 border border-zinc-800 mt-5 hover:bg-zinc-700"
            >
              {pending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
