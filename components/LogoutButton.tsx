import { logOut } from "@/lib/actions/auth";
import { CgLogOut } from "react-icons/cg";  

interface Props {
  className: String
}
export default function LogoutButton({className}: Props) {
  return (
    <form action={logOut}>
      <button 
        type="submit"
        className="flex items-center gap-2 text-zinc-800 text-[16px] py-2 px-5 bg-zinc-50 border border-zinc-100 hover:border-zinc-800"
      >
        <CgLogOut className="text-[20px]"/>
        <span>Log out</span>
      </button>
    </form>
  )
}