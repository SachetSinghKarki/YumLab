import { useState } from "react";
import {useNavigate} from "react-router-dom"
import api from "../api/axios"

const Register = () => {
  const navigate = useNavigate()
const [error, setError] = useState("");
const [isLoading, setIsLoading] = useState(false);
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
 setError("")
 
 const formdata = new FormData(e.target)
 const username = formdata.get('username')
 const email = formdata.get('email')
 const password = formdata.get('password')

 try {
  const res = await api.post("/api/auth/register", {
    username,
    email,
    password
  })

  console.log(res)
  navigate("/login")

 } catch (error) {
  console.log(error.message)
  setError("Something went Wrong")
 }
 finally{
  setIsLoading(false)
 }

}

  return (
    <main className="min-h-[calc(100vh-70px)] bg-[#fff7ed]">
      <section className="grid min-h-[calc(100vh-70px)] grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex items-center justify-center px-6 py-14">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-[28px] border border-orange-100 bg-white p-8 shadow-[0_24px_70px_rgba(154,79,20,0.14)]"
          >
            <div className="mb-8">
              <p className="text-sm font-semibold text-orange-500">Register</p>
              <h2 className="mt-2 font-serif text-4xl font-bold text-[#1a1008]">
                Create account
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#7a6148]">
                Join YumLab and start saving your favorite dishes.
              </p>
            </div>

            <label className="mb-5 block">
              <span className="mb-2 block text-sm font-semibold text-[#3b2512]">
                Username
              </span>
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                className="h-12 w-full rounded-2xl border border-orange-100 bg-orange-50/50 px-4 text-sm text-[#1a1008] outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                required
              />
            </label>

            <label className="mb-5 block">
              <span className="mb-2 block text-sm font-semibold text-[#3b2512]">
                Email
              </span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="h-12 w-full rounded-2xl border border-orange-100 bg-orange-50/50 px-4 text-sm text-[#1a1008] outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                required
              />
            </label>

            <label className="mb-6 block">
              <span className="mb-2 block text-sm font-semibold text-[#3b2512]">
                Password
              </span>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                className="h-12 w-full rounded-2xl border border-orange-100 bg-orange-50/50 px-4 text-sm text-[#1a1008] outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                required
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-2xl bg-linear-to-r from-orange-400 to-red-500 text-sm font-bold text-white shadow-[0_12px_28px_rgba(249,115,22,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(249,115,22,0.42)]"
            >
              Register
            </button>
            {error && <span className="text-sm text-red-500 mt-5 underline"> {error} </span>}

            <p className="mt-7 text-center text-sm text-[#7a6148]">
              Already have an account?{" "}
              <a href="/login" className="font-bold text-orange-500 hover:text-red-500">
                Login
              </a>
            </p>
          </form>
        </div>

        <div className="relative hidden overflow-hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1400&q=80"
            alt="Fresh ingredients"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-l from-[#1a1008]/80 via-[#1a1008]/45 to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-end px-14 pb-14 text-white">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-orange-300">
              Fresh starts here
            </p>
            <h1 className="max-w-xl font-serif text-5xl font-bold leading-tight">
              Build your table with food made for sharing.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/70">
              Create your profile and bring your favorite flavors with you.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
