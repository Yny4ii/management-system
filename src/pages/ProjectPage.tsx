import React from 'react';
import {Card, CardActionArea, CardContent, Container, Grid, Paper, Typography} from '@mui/material';
import {Link, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import ProjectForm, {IFormValues} from "../components/ProjectForm";
import {addSprint} from "../redux/slices/sprintsSlice";

function ProjectPage() {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const project = useAppSelector(state => state.project.find(project =>project.id === id))
    console.log(project)

    const handleSprintFormSubmit = (data : IFormValues)=>{
        const sprint = {...data, todo:[], doing:[], done:[], projectId:id, id:Math.random().toString()};
        console.log(data)
       // @ts-ignore
        dispatch(addSprint(sprint))
    }

    return (
        <Container maxWidth="lg" style={{marginTop: '2rem'}}>
        <ProjectForm onSubmit={handleSprintFormSubmit} type='sprint'/>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Paper>Backlog</Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                {project && project.sprints.map(sprint=>(
                    <Link to={`/project/${id}/sprint/${sprint.id}`}>
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {sprint.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {sprint.description}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {sprint.timestamp}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    </Link>
                ))}
            </Grid>
        </Grid>
        </Container>
    );
}

export default ProjectPage;