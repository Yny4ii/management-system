import React, {useEffect, useState} from "react";
import {Container, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import TaskForm from "../components/TaskForm";
import {useParams} from "react-router-dom";
import TaskCard from "../components/TaskCard";
import {IFormValues} from "../components/ProjectForm";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {addTask} from "../redux/slices/projectsSlice";

const BacklogPage = () => {
    const {projectId} = useParams();
    const dispatch = useAppDispatch()
    const project = useAppSelector(state => state.project.find(project => project.id === projectId))
    const [tasks, setTasks] = useState(project.backlog.slice())
    const [sortType, setSortType] = useState("title");

    const sortTasks = (a, b) => {
        if (sortType === "estimate") {
            return a.storyPoints - b.storyPoints;
        } else if (sortType === "title") {
            return a.title.localeCompare(b.title);
        } else {
            return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        }
    };

    useEffect(() => {
        const sortedTasks = project.backlog.slice().sort(sortTasks)
        setTasks(sortedTasks)
    }, [project, sortType])

    const handleTaskFormSubmit = (data: IFormValues) => {
        const task = {...data, id: Math.random().toString(), projectId: projectId}
        dispatch(addTask(task))
    }


    const handleSortChange = (event) => {
        setSortType(event.target.value);
    };

    return (
        <Container>
            <TaskForm onSubmit={handleTaskFormSubmit}/>
            <FormControl sx={{marginY: '1rem'}}>
                <InputLabel>Sort by</InputLabel>
                <Select value={sortType} onChange={handleSortChange}>
                    <MenuItem value="timestamp">Date created</MenuItem>
                    <MenuItem value="estimate">Story points</MenuItem>
                    <MenuItem value="title">Title</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3}>
                {
                    tasks.sort(sortTasks).map(task => (
                        <Grid key={task.id} item xs={12} sm={6} md={4}>
                            <TaskCard task={task}/>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    );
};

export default BacklogPage;