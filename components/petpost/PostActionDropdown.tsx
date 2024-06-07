'use client';

import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { useState } from "react";
import Dropdown from "../ui/Dropdown";
import { BiSolidEditAlt } from "react-icons/bi";
import ConfirmDeletePost from "./ConfirmDeletePost";

interface Props {
  postId: string;
}

export default function PostActionDropdown({postId}: Props) {
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
            <button className="w-full flex items-center gap-2 px-5 py-2 border border-zinc-100 bg-zinc-50">
              <BiSolidEditAlt className="text-[20px]"/>
              <span>Edit</span>
            </button>
            <ConfirmDeletePost postId={postId}/>
          </div>
        </Dropdown>
      </div>
    </div>
  )
}