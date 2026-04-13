import React, { useEffect, useState } from "react";
import BookSortTypeDropdown from "../components/BookSortTypeDropdown";
import BooksTableView from "../components/BooksTableView";
import FilterSection from "../components/FilterSection";
import { getAllAuthors } from "../services/authorService";
import { fetchSortedBooks, fetchFilteredAndSortedBooks } from "../services/bookService";

const SortBooks = () => {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [chosenSortType, setChosenSortType] = useState('');
    const [chosenFilter, setChosenFilter] = useState({});

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchFilteredAndSortedBooks(chosenFilter, chosenSortType);
                setBooks(data);
            } catch (err) {
                console.error(err.message);
            }
        };

        const loadAuthors = async () => {
            try {
                const data = await getAllAuthors();
                setAuthors(data);
            } catch (err) {
                console.error(err.message);
            }
        };

        loadBooks();
        loadAuthors();
    }, []);

    const handleSortTypeChange = (sortType) => {
        setChosenSortType(sortType);

        const getFilteredAndSortedBooks = async () => {
            try {
                const data = await fetchFilteredAndSortedBooks(chosenFilter, sortType);
                setBooks(data);
            } catch (err) {
                console.error(err.message);
            }
        };

        getFilteredAndSortedBooks();
    };

    const filterBooks = (chosenFilterParams) => {
        setChosenFilter(chosenFilterParams);

        const getFilteredAndSortedBooks = async () => {
            try {
                const data = await fetchFilteredAndSortedBooks(chosenFilterParams, chosenSortType);
                setBooks(data);
            } catch (err) {
                console.error(err.message);
            }
        };

        getFilteredAndSortedBooks();
    };

    return (
        <div className="sort-books-page">
            <BookSortTypeDropdown onSelect={handleSortTypeChange} />
            <FilterSection authors={authors} onFilter={filterBooks} />
            <BooksTableView books={books} />
        </div>
    );
};

export default SortBooks;