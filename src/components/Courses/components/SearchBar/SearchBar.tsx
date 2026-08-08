import { useState } from "react";
import type { ChangeEvent } from "react";
import Button from "../../../../common/Button/Button";
import Input from "../../../../common/Input/Input";
import {
    SEARCH_BUTTON_TEXT,
    SEARCH_INPUT_PLACEHOLDER,
} from "../../../../constants";
import "./SearchBar.css";

type SearchBarProps = Readonly<{
    onSearch: (searchQuery: string) => void;
}>;

function SearchBar({ onSearch }: SearchBarProps) {
    const [searchQuery, setSearchQuery] = useState("");

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;

        setSearchQuery(value);

        if (!value) {
            onSearch("");
        }
    }

    return (
        <div className="search-bar">
            <Input
                className="search-bar__input"
                hideLabel
                labelText="Search courses"
                placeholderText={SEARCH_INPUT_PLACEHOLDER}
                value={searchQuery}
                onChange={handleChange}
            />
            <Button
                buttonText={SEARCH_BUTTON_TEXT}
                onClick={() => onSearch(searchQuery)}
            />
        </div>
    );
}

export default SearchBar;
