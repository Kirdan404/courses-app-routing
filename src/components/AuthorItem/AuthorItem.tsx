import Button from "../../common/Button/Button";
import AddIcon from "../../common/Icons/AddIcon";
import TrashIcon from "../../common/Icons/TrashIcon";
import type { Author } from "../../types/course";
import "./AuthorItem.css";

type AuthorItemProps = Readonly<{
    author: Author;
    buttonText: string;
    onButtonClick: (authorId: string) => void;
}>;

function AuthorItem({ author, buttonText, onButtonClick }: AuthorItemProps) {
    const isDeleteButton = buttonText.toLowerCase().includes("delete");

    return (
        <div className="author-item">
            <span className="author-item__name">{author.name}</span>
            <div className="author-item__actions">
                <Button
                    buttonText={
                        <>
                            {isDeleteButton ? (
                                <TrashIcon className="author-item__delete-icon" />
                            ) : (
                                <AddIcon className="author-item__add-icon" />
                            )}
                            <span className="author-item__action-text">
                                {buttonText}
                            </span>
                        </>
                    }
                    className="author-item__action"
                    onClick={() => onButtonClick(author.id)}
                />
            </div>
        </div>
    );
}

export default AuthorItem;
