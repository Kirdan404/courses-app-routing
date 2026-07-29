import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
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

const initialFormValues: RegistrationFormValues = {
    name: "",
    email: "",
    password: "",
};

function Registration() {
    const [formValues, setFormValues] =
        useState<RegistrationFormValues>(initialFormValues);
    const [errors, setErrors] = useState<RegistrationFormErrors>({});

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

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
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

        // Registration request will be implemented when the API is connected.
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
                    buttonText="Registration"
                    className="registration__submit"
                    type="submit"
                />

                <p className="registration__login-message">
                    If you have an account you may <a href="/login">Login</a>
                </p>
            </form>
        </main>
    );
}

export default Registration;
