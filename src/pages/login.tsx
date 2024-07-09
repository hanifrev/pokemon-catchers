import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push("/dashboard");
      // console.log(response);
    } else {
      const data = await response.json();
      console.log("Login error:", data.message);
      alert("Username or password incorrect");
    }
  };

  const centered: React.CSSProperties = {
    margin: "0",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  Cookies.set("username", username);

  return (
    <div className="">
      <div
        className="flex flex-col gap-8 w-[320px] md:md:w-[375px] "
        style={centered}
      >
        <Image src="/assets/Logo.png" width={50} height={50} alt="logo" />
        <div className="text-zinc-900 text-5xl font-semibold leading-[48px]">
          Login
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="h-12 p-3 bg-zinc-100 rounded-xl text-neutral-600 text-[15px] font-semibold mt-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className=" h-12 p-3 bg-zinc-100 rounded-xl text-neutral-600 text-[15px] font-semibold mt-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="text-neutral-50 text-[15px] font-bold leading-normal h-12 px-5 py-3 bg-blue-500 hover:bg-blue-400 rounded-xl"
          >
            Sign in
          </button>
        </form>
        <div>
          <span className="text-gray-500 text-sm font-semibold leading-normal">
            Don’t have an account?{" "}
          </span>
          <Link href="/signup">
            <span className="text-zinc-900 text-sm font-semibold leading-normal">
              Sign up.
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
