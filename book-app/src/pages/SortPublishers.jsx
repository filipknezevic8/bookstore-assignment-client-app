import React, { useEffect, useState } from "react";
import { fetchSortedPublishers } from "../services/publisherService";
import TableView from "../components/TableView";
import SortTypeDropdown from "../components/SortTypeDropdown";

const SortPublishers = () => {
    const [publishers, setPublishers] = useState([]);

    useEffect(() => {
        const loadPublishers = async () => {
            try {
                const data = await fetchSortedPublishers();
                setPublishers(data);
            } catch (err) {
                console.error(err.message);
            }
        };

        loadPublishers();
    }, []);

    const handleSortTypeChange = (sortType) => {
        const getSortedPublishers = async () => {
            try {
                const data = await fetchSortedPublishers(sortType);
                setPublishers(data);
            } catch (err) {
                console.error(err.message);
            }
        };

        getSortedPublishers();
    };

    return (
        <div className="sort-publishers-page">
            <h1 className="page-title">Publishers</h1>
            <SortTypeDropdown onSelect={handleSortTypeChange} />
            <TableView publishers={publishers} />
        </div>
    );
};

export default SortPublishers;