import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { fetchSortTypes } from "../services/bookService";

const BookSortTypeDropdown = (props) => {
    const [sortTypes, setSortTypes] = useState([]);
    const [chosenType, setChosenType] = useState('');

    useEffect(() => {
        const loadSortTypes = async () => {
            try {
                const data = await fetchSortTypes();
                setSortTypes(data);
            } catch (err) {
                console.error(err.message);
            }
        };

        loadSortTypes();
    }, []);

    const renderOptions = () => {
        return sortTypes.map(type => (
            <MenuItem key={type.key} value={type.key}>
                {type.name}
            </MenuItem>
        ));
    };

    const handleChange = (event) => {
        setChosenType(event.target.value);
        props.onSelect(event.target.value);
    };

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="book-sort-type-label">Sort type</InputLabel>
            <Select
                labelId="book-sort-type-label"
                id="book-sort-type-select"
                value={chosenType}
                label="Sort type"
                onChange={handleChange}
            >
                {renderOptions()}
            </Select>
        </FormControl>
    );
};

export default BookSortTypeDropdown;