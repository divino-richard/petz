import { auth } from "@/auth";
import Avatar from "@/components/Avatar";
import Link from "next/link"; 

export default async function Navigation() {
  const session = await auth();
  if(!session) return null;
  const { user } = session;

  return (
    <nav className="flex justify-between items-center py-2 px-5 bg-zinc-100">
        <div>
          <Link 
            href={'/'}
            className="text-[18px] text-zinc-900 font-semibold"
          >
            Petz
          </Link>
        </div>
        <div>
          {user ?
            <Link href={'/account'}>
              {/* <Avatar 
                imageUrl={user.avatar}
                fallback={user.firstName[0] + user.lastName[0]}
                variant="small"
              /> */}
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