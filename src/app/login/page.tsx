'use client';

import { useRouter } from "next/navigation";
import {supabase} from "../lib/supabase";
import { useState } from "react";

export default function Login() {
  const [data, setData] = useState<{
    email: string,
    password: string
  }>({
    email: '',
    password: ''
  })
   
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const login = async () => {
    try {     
      setLoading(true);
      let { data: dataUser, error } = await supabase
      .auth
      .signInWithPassword({
       email: data.email,
       password: data.password
      })
      setLoading(false);

    if (dataUser) {
      console.log(dataUser)
      router.push('/')
    }
    } catch (error) {
        console.log(error);
    }
  }
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }


    return  <div className="container mx-auto w-[400px] p-6 bg-white rounded-lg shadow-lg">
    <div className="grid gap-4">
      <div className="grid gap-2">
        <label  className="text-lg font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="grid gap-2">
        <label  className="text-lg font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <button
        onClick={login}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        disabled={loading}      
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  </div>
  }