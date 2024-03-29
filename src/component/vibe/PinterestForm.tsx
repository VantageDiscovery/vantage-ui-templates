import EyeIcon from "icons/EyeIcon";
import PintrestIcon from "icons/PintrestIcon";
import React, { useState } from "react";

const PintrestForm = ({
  setUsername,
}: {
  setUsername: (username: string) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  const onLogin = () => {
    setUsername(email);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      className="flex flex-col bg-white gap-3 mx-2"
      onSubmit={(event) => {
        event.preventDefault();
        onLogin();
      }}
    >
      <div className="w-full flex items-center mt-2 justify-center">
        <PintrestIcon />
      </div>
      <span className="w-full md:text-xl lg:text-2xl xl:text-3xl sm:text-lg font-bold text-center mb-2">
        Log in to see more
      </span>
      <div className="flex flex-col mx-10 gap-3">
        <span className="ml-2 text-gray-500">Email</span>
        <input
          type="text"
          placeholder="Email"
          required={true}
          className="outline outline-gray-400 outline-1 rounded-2xl h-12 pl-4"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <span className="ml-2 text-gray-500">Password</span>
        <div className="relative h-12">
          <input
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Password"
            className="outline outline-gray-400 outline-1 rounded-2xl w-full h-full pl-4"
            required={true}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-5 top-5"
          >
            <EyeIcon />
          </button>
        </div>
        <p className="ml-2 font-bold text-start">Forgot password ?</p>
        <button className="rounded-4xl text-white font-bold text-lg !bg-pinterest-primary h-12">
          Log In
        </button>
      </div>
    </form>
  );
};

export default PintrestForm;
