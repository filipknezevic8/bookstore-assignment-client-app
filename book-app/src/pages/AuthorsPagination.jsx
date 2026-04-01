import React, { useEffect, useState } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import { fetchAuthorsPage } from "../services/authorService";
import TablePaginationActions from "../components/TablePaginationActions";

const AuthorsPagination = () => {
    const [page, setPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [authors, setAuthors] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);

    useEffect(() => {
        const loadAuthors = async () => {
            try {
                const data = await fetchAuthorsPage(page + 1);
                setAuthors(data.items);
                setTotalItems(data.count);
                setTotalPages(data.totalPages);
                setHasNextPage(data.hasNextPage);
                setHasPreviousPage(data.hasPreviousPage);
            } catch (err) {
                console.error(err.message);
            }
        };

        loadAuthors();
    }, [page]);

    const renderAuthors = () => {
        return authors.map((author) => (
            <TableRow hover key={author.id}>
                <TableCell>{author.id}</TableCell>
                <TableCell>{author.fullName}</TableCell>
                <TableCell>{author.biography}</TableCell>
                <TableCell>{new Date(author.dateOfBirth).toLocaleDateString()}</TableCell>
            </TableRow>
        ));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div className="authors-pagination-page">
            <h1 className="page-title">Authors</h1>
            <p className="authors-pagination-info">
                Page {page + 1} of {totalPages}
            </p>

            <TableContainer component={Paper} className="authors-table-container">
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Full name</TableCell>
                            <TableCell>Biography</TableCell>
                            <TableCell>Date of birth</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderAuthors()}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                colSpan={4}
                                count={totalItems}
                                rowsPerPage={4}
                                page={page}
                                rowsPerPageOptions={[]}
                                onRowsPerPageChange={() => {}}
                                onPageChange={handleChangePage}
                                ActionsComponent={(subprops) => (
                                    <TablePaginationActions
                                        {...subprops}
                                        hasNextPage={hasNextPage}
                                        hasPreviousPage={hasPreviousPage}
                                    />
                                )}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AuthorsPagination;