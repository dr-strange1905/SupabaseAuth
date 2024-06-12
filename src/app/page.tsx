"use client";
import {logout}  from "./logout/actions";

export default function Home() {
  return <div> <form action={logout}>
  <button
  type = "submit"
  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
  >
  Log out
  </button>
  </form>
  
</div>
}
