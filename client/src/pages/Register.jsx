import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import wave01 from "../assets/wave01.png";
import wave02 from "../assets/wave02.png";
import wave03 from "../assets/wave03.png";
import bigsun from "../assets/bigsun.png";
import { axiosIns } from "../axios";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosIns.post("/register", {
        userName: fullName,
        email,
        password,
      });
      console.log(data, "==========");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <body className="bg-gradient-to-b from-[#ecebe1] to-[#ffcd76] relative min-h-screen">
      <div className="absolute bottom-0 left-0 right-0">
        <img
          src={bigsun}
          alt="sun"
          className="absolute w-full bottom-0 shadow-lg"
        />
        <img
          src={wave03}
          alt="wave1"
          className="absolute w-full bottom-0 shadow-lg"
        />
        <img
          src={wave02}
          alt="wave2"
          className="absolute w-full bottom-0 shadow-lg"
        />
        <img
          src={wave01}
          alt="wave3"
          className="absolute w-full bottom-0 shadow-sm"
        />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-beige-100">
        <div className="relative p-1 bg-gradient-to-t from-[#fef7f1ff] via-[#fef7f1ff] to-[#fef7f1ff] rounded-lg">
          <div className="rounded-md w-full max-w-md p-8 space-y-6 bg-[#92bcbeff]">
            <h2 className="text-3xl font-bold text-center text-brown-600 text-[#263E40]">
              Register
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-brown-400"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                  className="w-full px-4 py-2 border border-brown-300 rounded-lg shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500 bg-beige-50"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-brown-400"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full px-4 py-2 border border-brown-300 rounded-lg shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500 bg-beige-50"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-brown-400"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full px-4 py-2 border border-brown-300 rounded-lg shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500 bg-beige-50"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#263e40] text-[#fef7f1ff] py-2 rounded-lg shadow-lg hover:bg-brown-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500"
              >
                Register
              </button>
            </form>

            <p className="text-sm font-light text-brown-400">
              Have an account?{" "}
              <a
                href="/login"
                className="font-medium text-[977458ff] hover:text-[#ffffff]"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </body>
  );
}
