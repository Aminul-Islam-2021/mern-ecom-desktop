import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../store/features/auth/authApi";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(value).unwrap();
      if (response.success === true) {
        toast.success(response?.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <>
      <div className=" pt-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-4 max-w-md mx-auto mt-10 border border-gray-300 rounded shadow-lg"
        >
          <h1 className="text-center text-xl font-medium mb-4">Sign Up</h1>
          <input
            type="text"
            name="username"
            value={value.username}
            required={true}
            onChange={handleChange}
            placeholder="Username"
            className="border border-gray-300 p-2 pl-6 rounded outline-none"
          />
          <input
            type="email"
            name="email"
            value={value.email}
            required={true}
            onChange={handleChange}
            placeholder="Email"
            className="border border-gray-300 p-2 pl-6 rounded outline-none"
          />
          <input
            type="password"
            name="password"
            value={value.password}
            required={true}
            onChange={handleChange}
            placeholder="Password"
            className="border border-gray-300 p-2 pl-6 rounded outline-none"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Register
          </button>
          <p className=" text-center text-sm text-gray-500 mt-2">
            Already have an account?
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
