import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Publishers from './pages/Publishers';
import Books from './pages/Books';
import BookForm from './pages/BookForm';
import AuthorsPagination from './pages/AuthorsPagination';
import SortPublishers from './pages/SortPublishers';
import SortBooks from './pages/SortBooks';
import Login from './pages/Login';
import UserContext from './UserContext';
import GoogleCallback from './pages/GoogleCallback';
import SearchVolumes from './pages/SearchVolumes';
import SearchIssues from './pages/SearchIssues';

const RequireAuth = ({ children }) => {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/" replace />;
};

const RequireEditor = ({ children }) => {
  const { user } = useContext(UserContext);
  return user && user.role === 'Editor' ? children : <Navigate to="/" replace />;
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload);
      } catch (err) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/publishers" element={<Publishers />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/create" element={<RequireAuth><BookForm /></RequireAuth>} />
              <Route path="/books/edit/:id" element={<RequireEditor><BookForm /></RequireEditor>} />
              <Route path="/authors/pagination" element={<AuthorsPagination />} />
              <Route path="/publishers/sort" element={<SortPublishers />} />
              <Route path="/books/sort" element={<SortBooks />} />
              <Route path="/google-callback" element={<GoogleCallback />} />
              <Route path="/volumes/search" element={<RequireEditor><SearchVolumes /></RequireEditor>} />
              <Route path="/issues/search" element={<RequireEditor><SearchIssues /></RequireEditor>} />
              {/* <Route path="/volumes/search" element={<SearchVolumes />} />
              <Route path="/issues/search" element={<SearchIssues />} /> */}
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;