import Image from "next/image";
import { getSession } from "./lib/actions/auth";

export default async function Home() {
  const user = await getSession();
  return (
    <main>
      {JSON.stringify(user)}
      <h1>Home</h1>
    </main>
  );
}
