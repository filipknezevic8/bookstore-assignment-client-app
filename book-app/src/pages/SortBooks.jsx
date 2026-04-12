import React, { useEffect, useState } from "react";
import BookSortTypeDropdown from "../components/BookSortTypeDropdown";
import BooksTableView from "../components/BooksTableView";
import { fetchSortedBooks } from "../services/bookService";

const SortBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchSortedBooks();
                setBooks(data);
            } catch (err) {
                console.error(err.message);
            }
        };

        loadBooks();
    }, []);

    const handleSortTypeChange = (sortType) => {
        const getSortedBooks = async () => {
            try {
                const data = await fetchSortedBooks(sortType);
                setBooks(data);
            } catch (err) {
                console.error(err.message);
            }
        };

        getSortedBooks();
    };

    return (
        <div className="sort-books-page">
            <BookSortTypeDropdown onSelect={handleSortTypeChange} />
            <BooksTableView books={books} />
        </div>
    );
};

export default SortBooks;