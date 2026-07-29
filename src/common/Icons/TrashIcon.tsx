type TrashIconProps = Readonly<{
    className?: string;
}>;

function TrashIcon({ className }: TrashIconProps) {
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
                d="M2.4 3.6H10.6M5 1.7H8M3.4 3.6L3.9 11H9.1L9.6 3.6M5.3 5.4V9.2M7.7 5.4V9.2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
            />
        </svg>
    );
}

export default TrashIcon;
