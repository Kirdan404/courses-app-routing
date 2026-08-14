import { useId } from "react";
import type { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import "./Input.css";

type InputProps = Readonly<{
    labelText: string;
    placeholderText: string;
    className?: string;
    errorText?: string;
    hideLabel?: boolean;
    id?: string;
    name?: string;
    required?: boolean;
    type?: HTMLInputTypeAttribute;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}>;

function Input({
    labelText,
    placeholderText,
    className,
    errorText,
    hideLabel = false,
    id,
    name,
    required = false,
    type = "text",
    value,
    onChange,
}: InputProps) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const labelClassName = hideLabel
        ? "input__label input__label--visually-hidden"
        : "input__label";
    const inputClassName = [
        "input__field",
        className,
        errorText ? "input__field--error" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <label className="input">
            <span className={labelClassName}>{labelText}</span>
            <input
                aria-describedby={errorText ? errorId : undefined}
                aria-invalid={Boolean(errorText)}
                className={inputClassName}
                id={inputId}
                name={name}
                placeholder={placeholderText}
                required={required}
                type={type}
                value={value}
                onChange={onChange}
            />
            {errorText && (
                <span className="input__error" id={errorId} role="alert">
                    {errorText}
                </span>
            )}
        </label>
    );
}

export default Input;
