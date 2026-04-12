import React from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

const BooksTableView = ({ books }) => {
    const renderBooks = () => {
        return books.map((book) => (
            <TableRow hover key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.authorFullName}</TableCell>
                <TableCell>{book.publisherName}</TableCell>
                <TableCell>{book.age}</TableCell>
            </TableRow>
        ));
    };

    return (
        <TableContainer component={Paper} className="books-table-container" sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>ISBN</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Publisher</TableCell>
                        <TableCell>Age</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderBooks()}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BooksTableView;