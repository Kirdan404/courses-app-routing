import { useState } from "react";

import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import "./Registration.css";

type RegistrationFormState = {
  name: string;
  email: string;
  password: string;
};

export default function Registraion() {
  const [form, setForm] = useState<RegistrationFormState>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<RegistrationFormState>>({});

  const handleChange =
    (field: keyof RegistrationFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = (e: React.FormEvent) => {
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
    if (!hasErrors) {
      // submit logic placeholder
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
            onClick={() => {}}
            ariaLabel="Register"
            name="register"
          />

          <p className="registration-info">
            If you have an account you may <b>Login</b> or <b>Register</b>
          </p>
        </form>
      </div>
    </div>
  );
}
