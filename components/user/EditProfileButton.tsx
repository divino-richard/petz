import { BiSolidEditAlt } from "react-icons/bi";

interface Props {
  onClick: () => void;
}
export default function EditProfileButton({onClick}:Props) {
  return (
    <button 
      className="w-fit flex items-center gap-2 text-[16px] bg-zinc-50 py-2 px-5 border border-zinc-100 hover:border-zinc-800 mt-5"
      onClick={onClick}
    >
      <BiSolidEditAlt className="text-[20px]"/>
      <span>Edit profile</span>
    </button>
  )
}