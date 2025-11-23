import "../Button/Button.css";

type ButtonProps = {
    buttonText: string;
    onClick: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    ariaLabel?: string;
}

export default function Button({
    buttonText,
    onClick,
    type = "button",
    className,
    ariaLabel,
}: ButtonProps) {
    const buttonClassName = ["btn-primary", className]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            className={buttonClassName}
            type={type}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            {buttonText}
        </button>
    );
}
