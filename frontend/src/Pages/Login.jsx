import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextValue";
import api from "../api/axios";

const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await api.post(
        "/api/auth/login",
        {
          username,
          password,
        }
      );
      updateUser(res.data);

      navigate("/");
    } catch (error) {
      console.log(error.message);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-70px)] bg-[#fff7ed]">
      <section className="grid min-h-[calc(100vh-70px)] grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative hidden overflow-hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80"
            alt="Fresh food table"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#1a1008]/80 via-[#1a1008]/45 to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-end px-14 pb-14 text-white">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-orange-300">
              Welcome back
            </p>
            <h1 className="max-w-xl font-serif text-5xl font-bold leading-tight">
              Sign in and keep your cravings close.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/70">
              Manage orders, save favorites, and discover fresh dishes from
              YumLab.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-14">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-[28px] border border-orange-100 bg-white p-8 shadow-[0_24px_70px_rgba(154,79,20,0.14)]"
          >
            <div className="mb-8">
              <p className="text-sm font-semibold text-orange-500">Login</p>
              <h2 className="mt-2 font-serif text-4xl font-bold text-[#1a1008]">
                Good to see you
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#7a6148]">
                Enter your username and password to continue.
              </p>
            </div>

            <label className="mb-5 block">
              <span className="mb-2 block text-sm font-semibold text-[#3b2512]">
                Username
              </span>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
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
                placeholder="Enter your password"
                className="h-12 w-full rounded-2xl border border-orange-100 bg-orange-50/50 px-4 text-sm text-[#1a1008] outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                required
              />
            </label>

            <button
              disabled={isLoading}
              type="submit"
              className="h-12 w-full rounded-2xl bg-linear-to-r from-orange-400 to-red-500 text-sm font-bold text-white shadow-[0_12px_28px_rgba(249,115,22,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(249,115,22,0.42)]"
            >
              Login
            </button>
            {error && <span className="text-sm text-red-500"> {error} </span>}
            <p className="mt-7 text-center text-sm text-[#7a6148]">
              Don't you have an account?{" "}
              <a
                href="/register"
                className="font-bold text-orange-500 hover:text-red-500"
              >
                Register
              </a>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
