import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useSignupMutation } from "@/services/api";
import Head from "next/head";
import { PulseLoader } from "react-spinners";

const Signup = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [signup, { isLoading, isSuccess, isError, error }] =
    useSignupMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await signup({ username, email, password }).unwrap();
      router.push("/login");
    } catch (error) {
      console.error("Signup error", error);
    }
  };

  const centered: React.CSSProperties = {
    margin: "0",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div>
      <Head>
        <title>Pokemon | Sign Up</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div
        className="flex flex-col gap-6 w-[320px] md:w-[375px]"
        style={centered}
      >
        <Image src="/assets/Logo.png" width={50} height={50} alt="logo" />
        <div className="text-zinc-900 text-5xl font-semibold leading-[48px]">
          Sign Up
        </div>
        <div className="text-[15px] font-semibold leading-normal">
          Start your journey today to become the best Pokemon Trainer ever
          lived.
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
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="email"
              className="h-12 p-3 bg-zinc-100 rounded-xl text-neutral-600 text-[15px] font-semibold mt-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="h-12 p-3 bg-zinc-100 rounded-xl text-neutral-600 text-[15px] font-semibold mt-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="text-neutral-50 text-[15px] font-bold leading-normal  h-12 px-5 py-3 bg-blue-500 rounded-xl"
          >
            {isLoading ? <PulseLoader color="#d3d3d3" size={5} /> : "Sign Up"}
          </button>
        </form>
        <div>
          <span className="text-gray-500 text-sm font-semibold leading-normal">
            Have an account?{" "}
          </span>
          <Link href="/login">
            <span className="text-zinc-900 text-sm font-semibold leading-normal">
              Login.
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
