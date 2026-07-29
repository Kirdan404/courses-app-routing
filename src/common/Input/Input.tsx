import type { ChangeEventHandler } from "react";
import "./Input.css";

type InputProps = Readonly<{
    labelText: string;
    placeholderText: string;
    className?: string;
    hideLabel?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}>;

function Input({
    labelText,
    placeholderText,
    className,
    hideLabel = false,
    onChange,
}: InputProps) {
    const labelClassName = hideLabel
        ? "input__label input__label--visually-hidden"
        : "input__label";

    return (
        <label className="input">
            <span className={labelClassName}>{labelText}</span>
            <input
                className={className}
                placeholder={placeholderText}
                onChange={onChange}
            />
        </label>
    );
}

export default Input;
