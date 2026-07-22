import "./Button.css";

type ButtonProps = {
    buttonText: string;
    onClick?: () => void;
};

function Button({ buttonText, onClick }: ButtonProps) {
    return (
        <button type="button" className="button" onClick={onClick}>
            {buttonText}
        </button>
    );
}

export default Button;