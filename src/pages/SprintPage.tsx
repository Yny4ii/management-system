import React from 'react';
import {Container, Grid, Paper} from "@mui/material";
import {useParams} from "react-router-dom";

const SprintPage = () => {
    const {sprintId} = useParams()
    return (
        <Container maxWidth="lg" style={{marginTop: '2rem'}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper>Todo</Paper>

                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper>Doing</Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper>Done</Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SprintPage;