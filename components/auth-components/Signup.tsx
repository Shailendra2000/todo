"useClient";

import Link from "next/link";
import SignupForm from "./SignupForm";
const Signup = () => {
  return (
    <div className="grid h-screen place-items-center">
      <div className="flex flex-col items-center">
        <SignupForm />
        <h3>Already have account?</h3>
        <Link className="text-blue-500" href="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
