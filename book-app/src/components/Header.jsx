import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="site-header">
            <nav className="nav">
                <Link className="nav-link" to="/publishers">Publishers</Link>
                <Link className="nav-link" to="/books">Books</Link>
                <Link className="nav-link" to="/books/create">Create book</Link>
            </nav>
        </header>
    );
};

export default Header;