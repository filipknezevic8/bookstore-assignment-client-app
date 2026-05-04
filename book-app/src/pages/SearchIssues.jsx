import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchIssuesByVolumeId } from '../services/comicVineService';
import SaveIssueForm from '../components/SaveIssueForm';
import './search.scss';

const SearchIssues = () => {
    const [searchParams] = useSearchParams();
    const volumeId = searchParams.get('volumeId');
    const volumeName = searchParams.get('volumeName');

    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedIssue, setSelectedIssue] = useState(null);

    useEffect(() => {
        const loadIssues = async () => {
            if (!volumeId) {
                setError('Nedostaje identifikator toma.');
                return;
            }

            setLoading(true);
            setError('');

            try {
                const data = await searchIssuesByVolumeId(volumeId);
                setIssues(data);
            } catch (err) {
                setError('Greška prilikom pretrage izdanja.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadIssues();
    }, [volumeId]);

    const openSaveForm = (issue) => {
        setSelectedIssue(issue);
    };

    const handleSaved = () => {
        setSelectedIssue(null);
    };

    return (
        <div className="search-page">
            <h1 className="page-title">Search issues</h1>

            {volumeName && <p className="search-subtitle">Volume: {volumeName}</p>}

            {loading && <p>Searching...</p>}
            {error && <div className="error">{error}</div>}

            {issues.length > 0 && (
                <table className="search-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Issue number</th>
                            <th>Cover date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((issue) => (
                            <tr key={issue.id}>
                                <td>{issue.id}</td>
                                <td>{issue.name}</td>
                                <td>{issue.issueNumber}</td>
                                <td>{issue.coverDate}</td>
                                <td>
                                    <button className="search-btn" onClick={() => openSaveForm(issue)}>
                                        Save issue
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedIssue && (
                <SaveIssueForm
                    issue={selectedIssue}
                    onSaved={handleSaved}
                />
            )}
        </div>
    );
};

export default SearchIssues;