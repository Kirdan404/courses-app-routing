import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import "./Registration.css";

type RegistrationFormValues = {
    name: string;
    email: string;
    password: string;
};

type RegistrationFormErrors = Partial<
    Record<keyof RegistrationFormValues, string>
>;

type RegistrationResponse = {
    successful?: boolean;
    errors?: string[];
};

const initialFormValues: RegistrationFormValues = {
    name: "",
    email: "",
    password: "",
};

function Registration() {
    const navigate = useNavigate();
    const [formValues, setFormValues] =
        useState<RegistrationFormValues>(initialFormValues);
    const [errors, setErrors] = useState<RegistrationFormErrors>({});
    const [serverError, setServerError] = useState("");

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const fieldName = event.target.name as keyof RegistrationFormValues;
        const { value } = event.target;

        setFormValues((currentValues) => ({
            ...currentValues,
            [fieldName]: value,
        }));

        if (errors[fieldName] && value.trim()) {
            setErrors((currentErrors) => ({
                ...currentErrors,
                [fieldName]: undefined,
            }));
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const validationErrors: RegistrationFormErrors = {};

        if (!formValues.name.trim()) {
            validationErrors.name = "Name is required.";
        }

        if (!formValues.email.trim()) {
            validationErrors.email = "Email is required.";
        }

        if (!formValues.password.trim()) {
            validationErrors.password = "Password is required.";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setServerError("");

        try {
            const response = await fetch("http://localhost:4000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formValues.name.trim(),
                    email: formValues.email.trim(),
                    password: formValues.password,
                }),
            });
            const result = (await response.json()) as RegistrationResponse;

            if (response.ok || result.successful) {
                navigate("/login");
                return;
            }

            setServerError(result.errors?.join(", ") ?? "Registration failed.");
        } catch {
            setServerError("Unable to connect to the server.");
        }
    }

    return (
        <main className="registration">
            <h1 className="registration__title">Registration</h1>

            <form
                className="registration__form"
                noValidate
                onSubmit={handleSubmit}
            >
                <div className="registration__fields">
                    <Input
                        errorText={errors.name}
                        labelText="Name"
                        name="name"
                        placeholderText="Input text"
                        required
                        value={formValues.name}
                        onChange={handleChange}
                    />
                    <Input
                        errorText={errors.email}
                        labelText="Email"
                        name="email"
                        placeholderText="Input text"
                        required
                        type="email"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                    <Input
                        errorText={errors.password}
                        labelText="Password"
                        name="password"
                        placeholderText="Input text"
                        required
                        type="password"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                </div>

                <Button
                    buttonText="Register"
                    className="registration__submit"
                    type="submit"
                />

                {serverError && (
                    <p className="registration__error" role="alert">
                        {serverError}
                    </p>
                )}

                <p className="registration__login-message">
                    If you have an account you may{" "}
                    <Link to="/login">Login</Link>
                </p>
            </form>
        </main>
    );
}

export default Registration;
