'use client';

import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { useState } from "react";
import Dropdown from "../ui/Dropdown";
import ConfirmDeletePost from "./ConfirmDeletePost";
import { PetPost, PostImage } from "@prisma/client";
import EditPetPostModal from "./EditPetPostModal";

interface Props {
  petPost: PetPost & {
    images: PostImage[]
  };
}

export default function PostActionDropdown({petPost}: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div>
      <IoEllipsisVerticalSharp 
        size={30}
        className="p-[5px] cursor-pointer rounded-full hover:bg-zinc-200"
        onClick={() => setShowDropdown(true)}
      />

      <div className="relative">
        <Dropdown
          show={showDropdown}
          onClose={() => setShowDropdown(false)}
          position="left"
        >
          <div className="flex flex-col gap-2">
            <EditPetPostModal petPost={petPost}/>
            <ConfirmDeletePost postId={petPost.id}/>
          </div>
        </Dropdown>
      </div>
    </div>
  )
}