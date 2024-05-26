import { getSession } from "@/app/lib/actions/auth"

export default async function Page() {
  const user = await getSession()
  return (
    <div>
      <h1>Edit profile</h1>
      <p>{JSON.stringify(user)}</p>
    </div>
  )
}