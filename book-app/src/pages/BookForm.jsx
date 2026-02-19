import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createBook, getBookById, updateBook } from '../services/bookService';
import { getAllPublishers } from '../services/publisherService';
import { getAllAuthors } from '../services/authorService';
import { useNavigate, useParams } from 'react-router-dom';
import './bookform.scss';

const BookForm = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const a = await getAllAuthors();
                setAuthors(a);
                const p = await getAllPublishers();
                setPublishers(p);

                if (isEdit) {
                    const book = await getBookById(id);
                    reset({
                        title: book.title,
                        pageCount: book.pageCount,
                        publishedDate: book.publishedDate ? book.publishedDate.split('T')[0] : '',
                        isbn: book.isbn,
                        authorId: book.authorId,
                        publisherId: book.publisherId
                    });
                } else {
                    reset({
                        title: '',
                        pageCount: 0,
                        publishedDate: '',
                        isbn: '',
                        authorId: authors.length > 0 ? authors[0].id : '',
                        publisherId: publishers.length > 0 ? publishers[0].id : ''
                    });
                }
            } catch (error) {
                console.error(error);
                setErrorMsg('Greška pri učitavanju podataka forme.');
            }
        })();
    }, [id]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                title: data.title,
                pageCount: Number(data.pageCount),
                publishedDate: new Date(data.publishedDate).toISOString(),
                isbn: data.isbn,
                authorId: Number(data.authorId),
                publisherId: Number(data.publisherId)
            };
            if (isEdit) {
                await updateBook(Number(id), { id: Number(id), ...payload });
            } else {
                await createBook(payload);
            }
            navigate('/books');
        } catch (error) {
            console.error(error);
            setErrorMsg('Greška prilikom čuvanja knjige.');
        }
    };

    return (
        <div className="bookform-page">
            <h1 className="page-title">{isEdit ? 'Edit book' : 'Create book'}</h1>

            {errorMsg && <div className="error">{errorMsg}</div>}

            <form className="book-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                    <label>Title</label>
                    <input className="form-input" {...register('title', { required: 'Naziv je obavezan' })} />
                    {errors.title && <span className="field-error">{errors.title.message}</span>}
                </div>

                <div className="form-row">
                    <label>Page count</label>
                    <input className="form-input" type="number" {...register('pageCount', { required: 'Broj strana je obavezan', min: 1 })} />
                    {errors.pageCount && <span className="field-error">{errors.pageCount.message}</span>}
                </div>

                <div className="form-row">
                    <label>Published date</label>
                    <input className="form-input" type="date" {...register('publishedDate', { required: 'Datum objavljivanja je obavezan' })} />
                    {errors.publishedDate && <span className="field-error">{errors.publishedDate.message}</span>}
                </div>

                <div className="form-row">
                    <label>ISBN</label>
                    <input className="form-input" {...register('isbn', { required: 'ISBN je obavezan' })} />
                    {errors.isbn && <span className="field-error">{errors.isbn.message}</span>}
                </div>

                <div className="form-row">
                    <label>Author</label>
                    <select className="form-input" {...register('authorId', { required: 'Autor je obavezan' })}>
                        <option value="">-- izaberi autora --</option>
                        {authors.map(a => (
                            <option key={a.id} value={a.id}>{a.fullName}</option>
                        ))}
                    </select>
                    {errors.authorId && <span className="field-error">{errors.authorId.message}</span>}
                </div>

                <div className="form-row">
                    <label>Publisher</label>
                    <select className="form-input" {...register('publisherId', { required: 'Izdavač je obavezan' })}>
                        <option value="">-- izaberi izdavača --</option>
                        {publishers.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                    {errors.publisherId && <span className="field-error">{errors.publisherId.message}</span>}
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-save">{isEdit ? 'Save' : 'Create'}</button>
                    <button type="button" className="btn btn-cancel" onClick={() => navigate('/books')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default BookForm;