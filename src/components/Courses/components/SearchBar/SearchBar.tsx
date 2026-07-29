import Button from "../../../../common/Button/Button";
import Input from "../../../../common/Input/Input";
import {
    SEARCH_BUTTON_TEXT,
    SEARCH_INPUT_PLACEHOLDER,
} from "../../../../constants";
import "./SearchBar.css";

function SearchBar() {
    return (
        <div className="search-bar">
            <Input
                labelText="Search courses"
                placeholderText={SEARCH_INPUT_PLACEHOLDER}
                className="search-bar__input"
                hideLabel
            />
            <Button buttonText={SEARCH_BUTTON_TEXT} />
        </div>
    );
}

export default SearchBar;
