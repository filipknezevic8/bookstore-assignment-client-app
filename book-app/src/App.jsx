import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Publishers from './pages/Publishers';
import Books from './pages/Books';
import BookForm from './pages/BookForm';
import AuthorsPagination from './pages/AuthorsPagination';
import SortPublishers from './pages/SortPublishers';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<h1 className="page-title">Welcome to Bookstore</h1>} />
            <Route path="/publishers" element={<Publishers />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/create" element={<BookForm />} />
            <Route path="/books/edit/:id" element={<BookForm />} />
            <Route path="/authors/pagination" element={<AuthorsPagination />} />
            <Route path="/publishers/sort" element={<SortPublishers />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;