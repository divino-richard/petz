'use client';

import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

export default function BackButton() {
  const Router = useRouter();
  return (
    <button
      className="flex items-center gap-2"
      onClick={() => Router.back()}
    >
      <IoMdArrowBack 
        size={22}
      />
      <span>Back</span>
    </button>
  )
}