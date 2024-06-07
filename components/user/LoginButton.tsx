'use client';

import { useFormStatus } from "react-dom";

export default function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit"
      className="bg-zinc-900 text-[14px] text-white p-2 rounded-md"
    >
      {pending ? 'Loading...' : 'Sign in'}
    </button>
  )
}