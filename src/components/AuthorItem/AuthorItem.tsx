import Button from "../../common/Button/Button";
import "./AuthorItem.css";

type AuthorItemProps = {
  name: string;
  onAdd?: () => void;
  onDelete?: () => void;
};

export default function AuthorItem({ name, onAdd, onDelete }: AuthorItemProps) {
  return (
    <div className="author-item">
      <span className="author-item__name">{name}</span>
      <div className="author-item__buttons">
        {onAdd && (
          <Button
            className="author-item__button author-item__button--add"
            buttonText=""
            ariaLabel="add"
            onClick={onAdd}
          />
        )}
        {onDelete && (
          <Button
            className="author-item__button author-item__button--delete"
            buttonText=""
            ariaLabel="delete"
            onClick={onDelete}
          />
        )}
      </div>
    </div>
  );
}
