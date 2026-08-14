type AddIconProps = Readonly<{
    className?: string;
}>;

function AddIcon({ className }: AddIconProps) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            fill="none"
            height="13"
            viewBox="0 0 13 13"
            width="13"
        >
            <path
                d="M6.5 2.2V10.8M2.2 6.5H10.8"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
            />
        </svg>
    );
}

export default AddIcon;
