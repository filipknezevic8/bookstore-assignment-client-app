import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="site-header">
            <nav className="nav">
                <Link className="nav-link" to="/publishers">Publishers</Link>
                <Link className="nav-link" to="/books">Books</Link>
                <Link className="nav-link" to="/books/create">Create book</Link>
                <Link className="nav-link" to="/authors/pagination">Authors</Link>
                <Link className="nav-link" to="/publishers/sort">Sorted publishers</Link>
                <Link className="nav-link" to="/books/sort">Sorted books</Link>
            </nav>
        </header>
    );
};

export default Header;