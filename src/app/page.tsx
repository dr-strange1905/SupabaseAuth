"use client";
import {logout}  from "./logout/actions";
import DemoClientComponent from "./component/DemoClientComponent"
import TodoForm from "./component/todoForm";
import TodoList from "./component/todoList";
import React, { useState, useEffect } from 'react';
import { supabase } from "../../utils/supabase/supabaseClient";
import { createClient } from '../../utils/supabase/client'
import { UUID } from "crypto";



interface Todo {
  id: number;
  text: string;
  userId: String
}
interface User {
  id: String
}


export default function Home() {

  const [user, setUser] = useState<User | null>(null); 

  useEffect(() => {
      async function getUser(){
          const supabase1 = createClient()
          const { data, error } = await supabase1.auth.getUser()
          if (error || !data?.user) {
            console.log('no user')
          } else {
              setUser(data.user as User)
          }
      }
      getUser()
  }, [])

  console.log({user})

  const [todos, setTodos] = useState<Todo[]>([]);
  
  
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase.from('TodoList').select('*').eq('userId', user?.id);
      if (error) throw error;
      setTodos(data as Todo[]);
    } catch (error) {
      console.error('Error fetching todos:', (error as Error).message);
    }
  };

  const addTodo = async (text: string) => {
    try {
      const { data, error } = await supabase.from('TodoList').insert({ text, userId: user?.id }).select();
      if (error) throw error;
      setTodos((prevTodos) => [...prevTodos, data[0] as Todo]);
    } catch (error) {
      console.error('Error adding todo:', (error as Error).message);
    }
  };
  
  const deleteTodo = async (id: number) => {
    try {
      const { error } = await supabase.from('TodoList').delete().eq('id', id).eq('user_id', user?.id);
      if (error) throw error;
      setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', (error as Error).message);
    }
  };

  return <div>
   <DemoClientComponent /> 
   
  <TodoForm addTodo={addTodo} />
  
  <div className="mb-4"> 
  <TodoList todos={todos} onDelete={deleteTodo} />
 </div>
  <form action={logout} className="max-w-sm mx-auto">
  <button
    type="submit"
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    Log out
  </button>
</form>


</div>
}
