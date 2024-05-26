import { getSession } from "@/app/lib/actions/auth";
import Avatar from "@/app/ui/Avatar";
import Link from "next/link";

export default async function Navigation() {
  const user = await getSession();

  return (
    <nav className="flex justify-between items-center py-2 px-5 bg-zinc-100">
        <div>
          <h1 className="text-[18px] text-zinc-900 font-semibold">Petz</h1>
        </div>
        <div>
          {user ?
            <Link href={'/account'}>
              <Avatar 
                imageUrl={user.avatar}
                fallback={user.firstName[0] + user.lastName[0]}
                variant="small"
              />
            </Link>
            :
            <Link href={'/signin'}>
              Sign In
            </Link>
          }
        </div>
      </nav>
  )
}