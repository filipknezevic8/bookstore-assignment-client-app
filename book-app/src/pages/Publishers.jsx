import React, { useState, useEffect } from 'react';
import { getAllPublishers } from '../services/publisherService';

const Publishers = () => {
    const [publishers, setPublishers] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchData = async () => {
        try {
            const data = await getAllPublishers();
            setPublishers(data);
        } catch (error) {
            setErrorMsg('Došlo je do greške prilikom dobavljanja izdavača.');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="publishers-page">
            <h1 className="page-title">Publishers</h1>

            {errorMsg && <div className="error">{errorMsg}</div>}

            <table className="publishers-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                    {publishers.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.address}</td>
                            <td><a href={p.website} target="_blank" rel="noreferrer">{p.website}</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Publishers;