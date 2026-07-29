import "./Button.css";

type ButtonProps = Readonly<{
    buttonText: string;
    className?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
}>;

function Button({
    buttonText,
    className,
    type = "button",
    onClick,
}: ButtonProps) {
    const buttonClassName = ["button", className].filter(Boolean).join(" ");

    return (
        <button type={type} className={buttonClassName} onClick={onClick}>
            {buttonText}
        </button>
    );
}

export default Button;
