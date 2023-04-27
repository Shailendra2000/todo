import * as Yup from 'yup'

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required!"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters!")
      .required("Password is required!"),
});


export const signupValidationSchema = Yup.object().shape({
    username: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
});