"use client";
import Link from "next/link";
import LoginForm from "./LoginForm";

const Login = () => {
  const signupLink = "signup";
  return (
    <div className="grid h-screen place-items-center">
      <div className="flex flex-col items-center">
        <LoginForm />
        <h3>Do not have account?</h3>
        <Link className="text-blue-500" href={signupLink}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
