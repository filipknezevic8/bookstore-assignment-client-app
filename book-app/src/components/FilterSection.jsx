import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";

const FilterSection = (props) => {
    const [title, setTitle] = useState('');
    const [publishedDateFrom, setPublishedDateFrom] = useState('');
    const [publishedDateTo, setPublishedDateTo] = useState('');
    const [authorFullName, setAuthorFullName] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [authorDateOfBirthFrom, setAuthorDateOfBirthFrom] = useState('');
    const [authorDateOfBirthTo, setAuthorDateOfBirthTo] = useState('');

    const filter = () => {
        props.onFilter({
            Title: title ? title : null,
            PublishedDateFrom: publishedDateFrom ? new Date(publishedDateFrom).toISOString() : null,
            PublishedDateTo: publishedDateTo ? new Date(publishedDateTo).toISOString() : null,
            AuthorFullName: authorFullName ? authorFullName : null,
            AuthorId: authorId ? Number(authorId) : null,
            AuthorDateOfBirthFrom: authorDateOfBirthFrom ? new Date(authorDateOfBirthFrom).toISOString() : null,
            AuthorDateOfBirthTo: authorDateOfBirthTo ? new Date(authorDateOfBirthTo).toISOString() : null
        });
    };

    return (
        <Box className="book-filter-section" sx={{ flexGrow: 1, mt: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        label="Title"
                        variant="filled"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        label="Published date from"
                        type="date"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        value={publishedDateFrom}
                        onChange={(e) => setPublishedDateFrom(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        label="Published date to"
                        type="date"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        value={publishedDateTo}
                        onChange={(e) => setPublishedDateTo(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        label="Author full name"
                        variant="filled"
                        value={authorFullName}
                        onChange={(e) => setAuthorFullName(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <FormControl fullWidth variant="filled">
                        <InputLabel id="author-label">Choose author</InputLabel>
                        <Select
                            labelId="author-label"
                            value={authorId}
                            onChange={(e) => setAuthorId(e.target.value)}
                        >
                            <MenuItem value="">-- any author --</MenuItem>
                            {props.authors.map((author) => (
                                <MenuItem key={author.id} value={author.id}>
                                    {author.fullName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Button variant="outlined" onClick={filter}>
                        Filter
                    </Button>
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        label="Author date of birth from"
                        type="date"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        value={authorDateOfBirthFrom}
                        onChange={(e) => setAuthorDateOfBirthFrom(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        label="Author date of birth to"
                        type="date"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        value={authorDateOfBirthTo}
                        onChange={(e) => setAuthorDateOfBirthTo(e.target.value)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default FilterSection;