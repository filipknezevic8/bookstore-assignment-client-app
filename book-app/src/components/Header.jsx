import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import LogoutButton from './LogoutButton';

const Header = () => {
    const { user } = useContext(UserContext);

    return (
        <header className="site-header">
            <nav className="nav">
                <Link className="nav-link" to="/publishers">Publishers</Link>
                <Link className="nav-link" to="/books">Books</Link>
                <Link className="nav-link" to="/authors/pagination">Authors</Link>
                <Link className="nav-link" to="/publishers/sort">Sorted publishers</Link>
                <Link className="nav-link" to="/books/sort">Sorted books</Link>

                {user && (
                    <Link className="nav-link" to="/books/create">Create book</Link>
                )}

                {user?.role == "Editor" && (
                    <>
                        <Link className="nav-link" to="/volumes/search">Search volumes</Link>
                    </>
                )}

                {/* {user && (
                    <>
                        <Link className="nav-link" to="/volumes/search">Search volumes</Link>
                    </>
                )} */}

                {user ? (
                    <LogoutButton />
                ) : (
                    <Link className="nav-link" to="/">Login</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;