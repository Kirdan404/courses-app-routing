import Button from "../../../../common/Button/Button";
import {
    SEARCH_BUTTON_TEXT,
    SEARCH_INPUT_PLACEHOLDER,
} from "../../../../constants";
import "./SearchBar.css";

function SearchBar() {
    return (
        <div className="search-bar">
            <input
                className="search-bar__input"
                placeholder={SEARCH_INPUT_PLACEHOLDER}
            />
            <Button buttonText={SEARCH_BUTTON_TEXT} />
        </div>
    );
}

export default SearchBar;
