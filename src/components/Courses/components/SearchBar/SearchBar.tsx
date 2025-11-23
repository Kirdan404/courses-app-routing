import { ChangeEvent, KeyboardEvent, useState } from "react";
import "./SearchBar.css";
import Button from "../../../../common/Button/Button";
import "./SearchBar.css";

type SearchBarProps = {
    onSearch?: (value: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [value, setValue] = useState("");

    const handleSearch = () => onSearch?.(value);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextValue = event.target.value;
        setValue(nextValue);
        if (nextValue === "") {
            onSearch?.("");
        }
    };

    return (
        <div className="search-bar">
            <input
                className="search-bar__input"
                type="text"
                placeholder="Input text"
                value={value}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                    if (event.key === "Enter") {
                        handleSearch();
                    }
                }}
                onChange={handleChange}
            />
            <Button
                className="search-bar__button"
                buttonText="Search"
                onClick={handleSearch}
            />
        </div>
    );
};

export default SearchBar;
