import Button from "../../../../common/Button/Button";
import AddIcon from "../../../../common/Icons/AddIcon";
import TrashIcon from "../../../../common/Icons/TrashIcon";
import "./AuthorItem.css";

type AuthorItemProps = Readonly<{
    authorName: string;
    onAdd?: () => void;
    onDelete?: () => void;
}>;

function AuthorItem({ authorName, onAdd, onDelete }: AuthorItemProps) {
    return (
        <div className="author-item">
            <span className="author-item__name">{authorName}</span>
            <div className="author-item__actions">
                {onAdd && (
                    <Button
                        ariaLabel={`Add ${authorName}`}
                        buttonText={
                            <AddIcon className="author-item__add-icon" />
                        }
                        className="author-item__action"
                        onClick={onAdd}
                    />
                )}
                {onDelete && (
                    <Button
                        ariaLabel={`Delete ${authorName}`}
                        buttonText={
                            <TrashIcon className="author-item__delete-icon" />
                        }
                        className="author-item__action"
                        onClick={onDelete}
                    />
                )}
            </div>
        </div>
    );
}

export default AuthorItem;
