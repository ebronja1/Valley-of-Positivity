import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/useAuth";
import { useForm } from "react-hook-form";
import "./RegisterPage.css";

type Props = {};

type RegisterFormsInputs = {
  email: string;
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  userName: Yup.string().required("Username is required"),
  password: Yup.string()
  .required("Password is required")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[^a-zA-Z]/, "Password must contain at least one non-alphabetic character"),

});

const RegisterPage = (props: Props) => {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });

  const handleRegister = (form: RegisterFormsInputs) => {
    registerUser(form.email, form.userName, form.password);
  };

  return (
    <section className="register-section">
      <div className="register-container">
        <div className="register-box">
          <div className="register-content">
            <h1 className="register-title">Sign up for an account</h1>
            <form className="register-form" onSubmit={handleSubmit(handleRegister)}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="form-input"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-input"
                  placeholder="Username"
                  {...register("userName")}
                />
                {errors.userName && (
                  <p className="error-message">{errors.userName.message}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="form-input"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="error-message">{errors.password.message}</p>
                )}
              </div>
              <div className="form-footer">
              </div>
              <button type="submit" className="submit-button">
                Sign up
              </button>
              <p className="login-link">
                Already have an account?{" "}
                <a href="login" className="sign-in">
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
