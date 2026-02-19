import React, { useState, useEffect } from 'react';
import { getAllBooks, deleteBook } from '../services/bookService';
import { useNavigate } from 'react-router-dom';
import './books.scss';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const data = await getAllBooks();
            setBooks(data);
        } catch (error) {
            setErrorMsg('Došlo je do greške prilikom dobavljanja knjiga.');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteBook(id);
            fetchData();
        } catch (error) {
            console.error(error);
            setErrorMsg('Greška prilikom brisanja knjige.');
        }
    };

    const handleEdit = (id) => {
        navigate(`/books/edit/${id}`);
    };

    return (
        <div className="books-page">
            <h1 className="page-title">Books</h1>

            {errorMsg && <div className="error">{errorMsg}</div>}

            <table className="books-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>PageCount</th>
                        <th>PublishedDate</th>
                        <th>ISBN</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(b => (
                        <tr key={b.id}>
                            <td>{b.id}</td>
                            <td>{b.title}</td>
                            <td>{b.pageCount}</td>
                            <td>{new Date(b.publishedDate).toLocaleDateString()}</td>
                            <td>{b.isbn}</td>
                            <td>{b.author ? b.author.fullName : '—'}</td>
                            <td>{b.publisher ? b.publisher.name : '—'}</td>
                            <td>
                                <button className="btn btn-edit" onClick={() => handleEdit(b.id)}>Edit</button>
                                <button className="btn btn-delete" onClick={() => handleDelete(b.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Books;