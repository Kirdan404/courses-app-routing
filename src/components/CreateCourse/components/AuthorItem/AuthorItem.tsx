import addIcon from "../../../../assets/add.png";
import trashIcon from "../../../../assets/trash.png";
import Button from "../../../../common/Button/Button";
import "./AuthorItem.css";

type AuthorItemProps = Readonly<{
    authorName: string;
    onAdd: () => void;
    onDelete: () => void;
}>;

function AuthorItem({ authorName, onAdd, onDelete }: AuthorItemProps) {
    return (
        <div className="author-item">
            <span className="author-item__name">{authorName}</span>
            <div className="author-item__actions">
                <Button
                    ariaLabel={`Add ${authorName}`}
                    buttonText={
                        <img
                            aria-hidden="true"
                            className="author-item__add-icon"
                            src={addIcon}
                            alt=""
                        />
                    }
                    className="author-item__action"
                    onClick={onAdd}
                />
                <Button
                    ariaLabel={`Delete ${authorName}`}
                    buttonText={
                        <img
                            aria-hidden="true"
                            className="author-item__delete-icon"
                            src={trashIcon}
                            alt=""
                        />
                    }
                    className="author-item__action"
                    onClick={onDelete}
                />
            </div>
        </div>
    );
}

export default AuthorItem;
