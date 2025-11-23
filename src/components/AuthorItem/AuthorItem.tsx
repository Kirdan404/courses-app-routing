import Button from "../../common/Button/Button";
import "./AuthorItem.css";

type AuthorItemProps = {
  name?: string;
  onAdd?: () => void;
  onDelete?: () => void;
  buttonText?: string;
  onButtonClick?: () => void;
  id?: string;
};

export default function AuthorItem({
  name,
  onAdd,
  onDelete,
  buttonText,
  onButtonClick,
  id,
}: AuthorItemProps) {
  const displayName = name || "John Doe";
  const variant = onDelete
    ? "delete"
    : onAdd
    ? "add"
    : buttonText?.toLowerCase().includes("delete")
    ? "delete"
    : "add";
  const text = buttonText || (variant === "add" ? "Add author" : "Delete author");
  const handler = onButtonClick || onAdd || onDelete;

  return (
    <div className="author-item">
      <span className="author-item__name">{displayName}</span>
      <div className="author-item__buttons">
        {handler && (
          <Button
            className={`author-item__button author-item__button--${variant}`}
            buttonText={text}
            ariaLabel={text}
            onClick={() => handler(id)}
          />
        )}
      </div>
    </div>
  );
}
