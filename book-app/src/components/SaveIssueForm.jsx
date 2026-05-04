import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createIssue } from '../services/comicVineService';

const SaveIssueForm = ({ issue, onSaved }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (issue) {
            reset({
                name: issue.name || '',
                issueReleaseDate: issue.coverDate ? issue.coverDate.split('T')[0] : '',
                issueNumber: issue.issueNumber || '',
                imageUrl: issue.imageUrl || '',
                description: issue.description || '',
                comicVineIssueId: issue.id || '',
                pageCount: '',
                price: '',
                availableCopies: ''
            });
        }
    }, [issue, reset]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                name: data.name,
                issueReleaseDate: new Date(data.issueReleaseDate).toISOString(),
                issueNumber: data.issueNumber,
                imageUrl: data.imageUrl,
                description: data.description,
                comicVineIssueId: Number(data.comicVineIssueId),
                pageCount: Number(data.pageCount),
                price: Number(data.price),
                availableCopies: Number(data.availableCopies)
            };

            await createIssue(payload);
            onSaved();
        } catch (error) {
            console.error(error);
            alert('Greška prilikom čuvanja izdanja.');
        }
    };

    return (
        <div className="issue-form-card">
            <h2 className="page-title">Save issue</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="issue-form">
                <div className="form-row">
                    <label>Name</label>
                    <input {...register('name')} readOnly />
                </div>

                <div className="form-row">
                    <label>Issue release date</label>
                    <input type="date" {...register('issueReleaseDate')} readOnly />
                </div>

                <div className="form-row">
                    <label>Issue number</label>
                    <input {...register('issueNumber')} readOnly />
                </div>

                <div className="form-row">
                    <label>Image URL</label>
                    <input {...register('imageUrl')} readOnly />
                </div>

                <div className="form-row">
                    <label>Description</label>
                    <textarea {...register('description')} rows="4" readOnly />
                </div>

                <div className="form-row">
                    <label>Comic Vine issue ID</label>
                    <input {...register('comicVineIssueId')} readOnly />
                </div>

                <div className="form-row">
                    <label>Page count</label>
                    <input
                        type="number"
                        {...register('pageCount', { required: 'Page count is required', min: 1 })}
                    />
                    {errors.pageCount && <span className="field-error">{errors.pageCount.message}</span>}
                </div>

                <div className="form-row">
                    <label>Price</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register('price', { required: 'Price is required', min: 0 })}
                    />
                    {errors.price && <span className="field-error">{errors.price.message}</span>}
                </div>

                <div className="form-row">
                    <label>Available copies</label>
                    <input
                        type="number"
                        {...register('availableCopies', { required: 'Available copies is required', min: 0 })}
                    />
                    {errors.availableCopies && <span className="field-error">{errors.availableCopies.message}</span>}
                </div>

                <button type="submit" className="search-btn">
                    Save
                </button>
            </form>
        </div>
    );
};

export default SaveIssueForm;