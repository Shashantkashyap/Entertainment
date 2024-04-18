import React, { useState } from "react";
import { MdMovie } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";

function LoginPage({ setActive }) {
  const BaseUri = "http://localhost:3000/api";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    
    const userData = {
      email: email,
      password: password
    };

    axios.post(`${BaseUri}/login`, userData)
      .then(response => {
        localStorage.setItem("token", response.data.token)
        console.log("Login successful:", response.data);
        toast.success("Login successful!");
        navigate("/");
      })
      .catch(error => {
        console.error("Login error:", error.response.data);
        toast.error("Login failed. Please check your credentials.");
      });
  };

  return (
    <div className="flex flex-col gap-14 min-h-screen">
      <Toaster />
      <div className="mt-10 cursor-pointer" onClick={() => navigate("/")}>
        <MdMovie fontSize={40} color="red" className="mx-auto" />
      </div>

      <div className="flex flex-col items-center justify-center h-full bg-[#10141E]">
        <div className="bg-[#161D2F] p-8 rounded-lg w-[30%] max-md:p-6 max-md:w-[80%] max-sm:w-[90%] flex flex-col gap-3 shadow-lg">
          <h2 className="text-[42px] text-white mb-4">Login</h2>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="mt-1 py-2 px-4 text-white outline-none bg-[#161D2F] text-[20px] block w-full rounded-md shadow-sm focus:ring-opacity-50"
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="h-[1.3px] mt-3 w-full bg-[#5A698F]"></div>
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="mt-1 py-2 px-4 text-white outline-none bg-[#161D2F] text-[20px] block w-full rounded-md shadow-sm focus:ring-opacity-50"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <FaRegEyeSlash color="white" />
                ) : (
                  <MdOutlineRemoveRedEye color="white" />
                )}
              </div>
            </div>
            <div className="h-[1.3px] mt-3 w-full bg-[#5A698F]"></div>
          </div>
          <button
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-600"
            onClick={handleLogin}
          >
            Login to your Account
          </button>
          <div className="mt-4 text-[16px] flex gap-1 text-white mx-auto">
            <p>Didn't have an account ?</p>
            <button
              className="text-red-600 hover:underline focus:outline-none"
              onClick={() => setActive(0)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
