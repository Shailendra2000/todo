"use client";
import axiosInstance from "@/intercepters/defaultIntercepter";
import { ISignupFormData } from "@/interfaces/auth-interfaces/signup.interface";
import { signupValidationSchema } from "@/validation-schemas/auth.validation-schema";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";

const initialValues = {
  username: "",
  email: "",
  password: "",
};

const SignupForm = () => {
  const router = useRouter();

  const email = "email";
  const password = "password";
  const username = "username";
  const feildsClassName = "search-input";

  const sucessMessage = "Account created, please login!";
  const sucessRedirectUrl = "/login";
  const url = "http://localhost:9000/signup";
  const errorMessage = "Enter Details Carefully!";

  const signupMutation = useMutation(
    (todo: ISignupFormData) =>
      axiosInstance.post(`${url}`, todo).then((res) => res.data),
    {
      onSuccess: (data: unknown) => {
        alert(`${sucessMessage}`);
        router.push(`${sucessRedirectUrl}`);
      },
      onError: (error) => {
        alert(`${errorMessage}`);
      },
    }
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        signupMutation.mutate(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg">
          <label htmlFor={username}>
            Username
            <Field
              className="search-input"
              type="text"
              name={username}
              placeholder="enter your username"
            />
            <h1 className="w-52 mb-5 text-red-500 text-xs">
              <ErrorMessage name={username} />
            </h1>
          </label>

          <label htmlFor={email}>
            Email
            <Field
              className={feildsClassName}
              type={email}
              name={email}
              placeholder="enter your email"
            />
            <h1 className="w-52 mb-5 text-red-500 text-xs">
              <ErrorMessage name={email} />
            </h1>
          </label>

          <label htmlFor={password}>
            Password
            <Field
              className={feildsClassName}
              type={password}
              name={password}
              placeholder="enter your password"
            />
            <h1 className="w-52 mb-5 text-red-500 text-xs">
              <ErrorMessage name={password} />
            </h1>
          </label>

          <button
            className="px-6 rounded border-none bg-orange-500 py-2 text-white hover:opacity-50"
            type="submit"
            disabled={isSubmitting}
          >
            Create account
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
