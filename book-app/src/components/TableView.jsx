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

const TableView = ({ publishers }) => {
    const renderPublishers = () => {
        return publishers.map((publisher) => (
            <TableRow hover key={publisher.id}>
                <TableCell>{publisher.name}</TableCell>
                <TableCell>{publisher.address}</TableCell>
                <TableCell>{publisher.website}</TableCell>
            </TableRow>
        ));
    };

    return (
        <TableContainer component={Paper} className="publishers-table-container" sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Website</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderPublishers()}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableView;