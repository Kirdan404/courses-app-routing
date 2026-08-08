import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import { API_BASE_URL, ROUTES, STORAGE_KEYS } from "../../constants";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/user/userSlice";
import "./Login.css";

type LoginFormValues = {
    email: string;
    password: string;
};

type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

type LoginResponse = {
    successful?: boolean;
    result?: string;
    errors?: string[];
    user?: {
        name?: string;
    };
};

type LoginProps = Readonly<{
    onLoginSuccess?: (userName: string) => void;
}>;

const initialFormValues: LoginFormValues = {
    email: "",
    password: "",
};

function Login({ onLoginSuccess }: LoginProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [formValues, setFormValues] =
        useState<LoginFormValues>(initialFormValues);
    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [serverError, setServerError] = useState("");

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

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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

        setServerError("");

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formValues.email.trim(),
                    password: formValues.password,
                }),
            });
            const result = (await response.json()) as LoginResponse;

            if ((response.ok || result.successful) && result.result) {
                const userName = result.user?.name ?? "";

                localStorage.setItem(STORAGE_KEYS.TOKEN, result.result);
                localStorage.setItem(STORAGE_KEYS.USER_NAME, userName);
                dispatch(
                    login({
                        name: userName,
                        email: formValues.email.trim(),
                        token: result.result,
                    })
                );
                onLoginSuccess?.(userName);
                navigate(ROUTES.COURSES);
                return;
            }

            setServerError(result.errors?.join(", ") ?? "Login failed.");
        } catch {
            setServerError("Unable to connect to the server.");
        }
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

                {serverError && (
                    <p className="login__error" role="alert">
                        {serverError}
                    </p>
                )}

                <p className="login__registration-message">
                    If you don&apos;t have an account you may{" "}
                    <Link to={ROUTES.REGISTRATION}>Registration</Link>
                </p>
            </form>
        </main>
    );
}

export default Login;
