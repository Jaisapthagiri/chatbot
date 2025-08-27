import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { axios, setToken } = useAppContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 🔹 Common validations
    if (!email || !password || (state === "register" && !name)) {
      toast.error("Please fill all required fields");
      return;
    }

    // 🔹 Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // 🔹 Password validation (applies for both login & register)
    // At least 8 characters, includes letter, number, and special char
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password must be 8+ chars, include a letter, number & special character");
      return;
    }

    const url = state === "login" ? '/api/user/login' : '/api/user/register'

    try {
      const { data } = await axios.post(url, { name, email, password })
      if (data.success) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
      <p className="text-2xl font-medium m-auto">
        <span className="text-purple-700">User</span> {state === "login" ? "Login" : "Sign Up"}
      </p>
      {state === "register" && (
        <div className="w-full">
          <p>Name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700" type="text" required />
        </div>
      )}
      <div className="w-full ">
        <p>Email</p>
        <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700" type="email" required />
      </div>
      <div className="w-full ">
        <p>Password</p>
        <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700" type="password" required />
      </div>
      {state === "register" ? (
        <p>
          Already have account? <span onClick={() => setState("login")} className="text-purple-700 cursor-pointer">click here</span>
        </p>
      ) : (
        <p>
          Create an account? <span onClick={() => setState("register")} className="text-purple-700 cursor-pointer">click here</span>
        </p>
      )}
      <button type='submit' className="bg-purple-700 hover:bg-purple-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">
        {state === "register" ? "Create Account" : "Login"}
      </button>
    </form>
  )
}

export default Login;
