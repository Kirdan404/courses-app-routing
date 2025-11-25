type InputProps = {
  labelText?: string;
  placeholderText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  value?: string;
  className?: string;
  id?: string;
  labelClassName?: string;
};

export default function Input({
  labelText,
  placeholderText,
  onChange,
  type = "text",
  name,
  value,
  className,
  id,
  labelClassName,
}: InputProps) {
  return (
    <label className={labelClassName}>
      {labelText}
      <input
        id={id}
        className={className}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholderText}
      />
    </label>
  );
}
