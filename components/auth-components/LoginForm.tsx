"use client";
import {
  ILoginFormData,
  ILoginResponseData,
} from "@/interfaces/auth-interfaces/login.interface";
import { useMutation } from "@tanstack/react-query";
import axios from "../../intercepters/defaultIntercepter";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { loginValidationSchema } from "@/validation-schemas/auth.validation-schema";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const router = useRouter();

  const feildsClassName: string = "search-input";
  const email: string = "email";
  const password: string = "password";

  const defaultAdminRedirectUrl = "/users";
  const defaultUserRedirectUrl = "/tasks";
  const defaultErrorMessage = "Invalid Creds!";
  const url = "http://localhost:9000/signin";

  const loginMutation = useMutation(
    (todo: ILoginFormData) =>
      axios.post(`${url}`, todo).then((res) => res.data),
    {
      onSuccess: (data: ILoginResponseData) => {
        if (data.isAdmin !== true) {
          router.push(`${defaultUserRedirectUrl}`);
        } else {
          router.push(`${defaultAdminRedirectUrl}`);
        }
      },
      onError: (error) => {
        alert(`${defaultErrorMessage}`);
      },
    }
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        loginMutation.mutate(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg">
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
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
