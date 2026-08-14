import { useId } from "react";
import type { ChangeEventHandler } from "react";
import "./Textarea.css";

type TextareaProps = Readonly<{
    labelText: string;
    placeholderText: string;
    errorText?: string;
    name?: string;
    required?: boolean;
    value?: string;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}>;

function Textarea({
    labelText,
    placeholderText,
    errorText,
    name,
    required = false,
    value,
    onChange,
}: TextareaProps) {
    const textareaId = useId();
    const errorId = `${textareaId}-error`;
    const textareaClassName = errorText
        ? "textarea__field textarea__field--error"
        : "textarea__field";

    return (
        <label className="textarea">
            <span className="textarea__label">{labelText}</span>
            <textarea
                aria-describedby={errorText ? errorId : undefined}
                aria-invalid={Boolean(errorText)}
                className={textareaClassName}
                id={textareaId}
                name={name}
                placeholder={placeholderText}
                required={required}
                value={value}
                onChange={onChange}
            />
            {errorText && (
                <span className="textarea__error" id={errorId} role="alert">
                    {errorText}
                </span>
            )}
        </label>
    );
}

export default Textarea;
