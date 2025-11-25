import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import "./Registration.css";

type RegistrationFormState = {
  name: string;
  email: string;
  password: string;
};

type RegistrationProps = {
  onRegisterSuccess?: (name: string) => void;
};

export default function Registraion({ onRegisterSuccess }: RegistrationProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegistrationFormState>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<RegistrationFormState>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange =
    (field: keyof RegistrationFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Partial<RegistrationFormState> = {};

    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else {
      const isEmailValid = /\S+@\S+\.\S+/.test(form.email);
      if (!isEmailValid) {
        nextErrors.email = "Email is invalid.";
      }
    }
    if (!form.password.trim()) nextErrors.password = "Password is required.";

    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) return;

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setApiError(result?.result || "Registration failed");
        return;
      }

      if (result?.user?.name) {
        localStorage.setItem("userName", result.user.name);
        onRegisterSuccess?.(result.user.name);
      } else {
        localStorage.removeItem("userName");
        onRegisterSuccess?.("");
      }

      navigate("/login");
    } catch (err) {
      setApiError("Network error. Please try again.");
    }
  };

  return (
    <div className="registration-container">
      <h3 className="registration-title">Registration</h3>

      <div className="registration-form-container">
        <form className="registration-form" onSubmit={handleSubmit} noValidate>
          <div className="registration-field">
            <Input
              labelText="Name"
              placeholderText="Input text"
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              className={errors.name ? "input-error" : undefined}
            />
            {errors.name && <span className="validation-error">{errors.name}</span>}
          </div>

          <div className="registration-field">
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

          <div className="registration-field">
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
            buttonText="REGISTER"
            className="btn-primary btn-registration-login"
            type="submit"
            ariaLabel="Register"
            onClick={() => {}}
          />
          {apiError && <span className="validation-error">{apiError}</span>}

          <p className="registration-info">
            If you have an account you may <b><Link to="/login">Login</Link></b> or{" "}
            <b>Registration</b>
          </p>
        </form>
      </div>
    </div>
  );
}
