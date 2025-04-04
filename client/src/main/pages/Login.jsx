import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/features/auth/authApi";
import { setCredentials } from "../../store/features/auth/authSlice";
import  toast  from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [value, setValue] = useState({
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
      const response = await login(value).unwrap();
      dispatch(setCredentials({ ...response }));
      if (response.success === true) {
        toast.success(response?.message);
        navigate(location.state?.from?.pathname || "/");
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
          <h1 className="text-center text-xl font-medium mb-4">Sign In</h1>
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
            Login
          </button>
          <p className=" text-center text-sm text-gray-500 mt-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
