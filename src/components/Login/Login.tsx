import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import "./Login.css";

type LoginFormValues = {
    email: string;
    password: string;
};

type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

const initialFormValues: LoginFormValues = {
    email: "",
    password: "",
};

function Login() {
    const [formValues, setFormValues] =
        useState<LoginFormValues>(initialFormValues);
    const [errors, setErrors] = useState<LoginFormErrors>({});

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const fieldName = event.target.name as keyof LoginFormValues;
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

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const validationErrors: LoginFormErrors = {};

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

        // Login request will be implemented when the API is connected.
    }

    return (
        <main className="login">
            <h1 className="login__title">Login</h1>

            <form className="login__form" noValidate onSubmit={handleSubmit}>
                <div className="login__fields">
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
                    buttonText="Login"
                    className="login__submit"
                    type="submit"
                />

                <p className="login__registration-message">
                    If you don&apos;t have an account you may{" "}
                    <a href="/registration">Registration</a>
                </p>
            </form>
        </main>
    );
}

export default Login;
