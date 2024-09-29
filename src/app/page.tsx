"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useHttp } from "./components/util/http-hook";
import { useDispatch } from "react-redux";
import { setToken } from "./store/authSlice";
export default function Home() {
  const route = useRouter();
  const adminData = localStorage.getItem("adminData");
  const dataBrowser = adminData ? JSON.parse(adminData) : null;

  if (dataBrowser) route.push("/api_fe/list_employee");
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const tokenExpirationDate = new Date().getTime() + 3555999;
  const {
    sendRequest,
    setErrorValidate,
    errorPesan,
    errorValidate,
    setErorrPesan,
  } = useHttp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const onLogin = (token: string) => dispatch(setToken({ token }));
    try {
      const res = await sendRequest(
        `http://localhost:8001/api_fe/login`,
        "POST",
        JSON.stringify({ username, password }),
        { "Content-Type": "application/json" },
      );
      onLogin(res.accesToken);
      localStorage.setItem(
        "adminData",
        JSON.stringify({
          token: res.accesToken,
          tokenexpied: tokenExpirationDate,
        }),
      );
      router.push("api_fe/list_employee");
    } catch (err: unknown) {
      setErrorValidate(true);
      setErorrPesan(err);
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {errorValidate && (
          <h1 className="text-center text-red-600">{errorPesan}</h1>
        )}
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              autoComplete="username"
              placeholder="username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
