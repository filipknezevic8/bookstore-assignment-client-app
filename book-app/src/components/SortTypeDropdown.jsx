import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { fetchSortTypes } from "../services/publisherService";

const SortTypeDropdown = (props) => {
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
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="sort-type-label">Sort type</InputLabel>
            <Select
                labelId="sort-type-label"
                id="sort-type-select"
                value={chosenType}
                label="Sort type"
                onChange={handleChange}
            >
                {renderOptions()}
            </Select>
        </FormControl>
    );
};

export default SortTypeDropdown;