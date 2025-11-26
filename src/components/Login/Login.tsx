import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";

import "./Login.css";

type LoginFormState = {
  email: string;
  password: string;
};

type LoginProps = {
  onLoginSuccess?: (name: string) => void;
};

const initialState: LoginFormState = {
  email: "",
  password: "",
};

const isEmailValid = (value: string) => /\S+@\S+\.\S+/.test(value);

export default function Login({ onLoginSuccess }: LoginProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginFormState>(initialState);
  const [errors, setErrors] = useState<Partial<LoginFormState>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange =
    (field: keyof LoginFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Partial<LoginFormState> = {};

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!isEmailValid(form.email)) {
      nextErrors.email = "Email is invalid.";
    }

    if (!form.password.trim()) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) return;

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setApiError(result?.result || "Login failed");
        return;
      }

      // if backend returns user info, you can adjust accordingly
      if (result?.user?.name) {
        localStorage.setItem("userName", result.user.name);
        onLoginSuccess?.(result.user.name);
      } else {
        localStorage.removeItem("userName");
        onLoginSuccess?.("");
      }
      localStorage.setItem("token", result.result);
      navigate("/courses");
    } catch (err) {
      setApiError("Network error. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h3 className="login-title">Login</h3>

      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-field">
            <Input
              labelText="Email"
              placeholderText="Input text"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              className={errors.email ? "input-error" : undefined}
            />
            {errors.email && <span className="validation-error">{errors.email}</span>}
          </div>

          <div className="login-field">
            <Input
              labelText="Password"
              placeholderText="Input text"
              type="password"
              value={form.password}
              onChange={handleChange("password")}
              className={errors.password ? "input-error" : undefined}
            />
            {errors.password && (
              <span className="validation-error">{errors.password}</span>
            )}
          </div>

          <Button
            buttonText="LOGIN"
            className="btn-primary btn-login-submit"
            type="submit"
            onClick={() => {}}
          />
          {apiError && <span className="validation-error">{apiError}</span>}

          <p className="login-info">
            If you don&apos;t have an account you may{" "}
            <b>
              <Link to="/registration">Registration</Link>
            </b>
          </p>
        </form>
      </div>
    </div>
  );
}
