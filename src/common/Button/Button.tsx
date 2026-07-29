import type { ReactNode } from "react";
import "./Button.css";

type ButtonProps = Readonly<{
    buttonText: ReactNode;
    ariaLabel?: string;
    className?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
}>;

function Button({
    buttonText,
    ariaLabel,
    className,
    type = "button",
    onClick,
}: ButtonProps) {
    const buttonClassName = ["button", className].filter(Boolean).join(" ");

    return (
        <button
            aria-label={ariaLabel}
            type={type}
            className={buttonClassName}
            onClick={onClick}
        >
            {buttonText}
        </button>
    );
}

export default Button;
