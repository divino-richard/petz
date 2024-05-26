'use client';

import { signIn } from "@/app/lib/actions/auth";
import LoginButton from "@/components/LoginButton";
import { useFormState } from "react-dom";

export default function Page() {
  const [errorMessage, dispatch] = useFormState(signIn, undefined);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-[500px] border border-zinc-200 p-5 rounded-lg space-y-5">
        <h1 className="text-[16px] text-zinc-900 font-semibold">Sign In</h1>
        {errorMessage && 
          <p className="text-red-500 text-[14px] text-center">
            {errorMessage}
          </p>
        }
        <form
          action={dispatch}
          className="flex flex-col gap-5"
        >
          <input 
            className="border border-zinc-200 p-2 rounded-md text-[14px]"
            type="text" placeholder="Email" name="email"
          />
          <input 
            className="border border-zinc-200 p-2 rounded-md text-[14px]"
            type="password" placeholder="Password" name="password"
          />
          <LoginButton />
        </form>
      </div>
    </div>
  );
}