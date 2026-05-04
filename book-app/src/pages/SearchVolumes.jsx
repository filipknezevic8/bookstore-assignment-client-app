import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchVolumesByName } from '../services/comicVineService';
import './search.scss';

const SearchVolumes = () => {
    const [filter, setFilter] = useState('');
    const [volumes, setVolumes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!filter.trim()) {
            setError('Unesite filter pretrage.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = await searchVolumesByName(filter);
            setVolumes(data);
        } catch (err) {
            setError('Greška prilikom pretrage tomova.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const goToIssues = (volume) => {
        navigate(`/issues/search?volumeId=${volume.id}&volumeName=${encodeURIComponent(volume.name || '')}`);
    };

    return (
        <div className="search-page">
            <h1 className="page-title">Search volumes</h1>

            <div className="search-bar">
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Volume name"
                    className="search-input"
                />
                <button className="search-btn" onClick={handleSearch}>
                    Search
                </button>
            </div>

            {loading && <p>Searching...</p>}
            {error && <div className="error">{error}</div>}

            {volumes.length > 0 && (
                <table className="search-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Start year</th>
                            <th>Issues</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {volumes.map((v) => (
                            <tr key={v.id}>
                                <td>{v.id}</td>
                                <td>{v.name}</td>
                                <td>{v.startYear}</td>
                                <td>{v.countOfIssues}</td>
                                <td>
                                    <button className="search-btn" onClick={() => goToIssues(v)}>
                                        Search issues
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SearchVolumes;