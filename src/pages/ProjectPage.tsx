import React, {useState} from 'react';
import {Button, Card, CardActionArea, CardContent, Container, Grid, Paper, Typography} from '@mui/material';
import {Link, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import ProjectForm, {IFormValues} from "../components/ProjectForm";
import {addSprint} from "../redux/slices/sprintsSlice";
import EditProjectModal from "../components/EditProjectModal";
import {Project} from "../interfaces/Project";
import {updateProject} from "../redux/slices/projectsSlice";

function ProjectPage() {
    const dispatch = useAppDispatch();
    const {projectId} = useParams();
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const project = useAppSelector(state => state.project.find(project => project.id === projectId))
    console.log(project)

    const handleSprintFormSubmit = (data: IFormValues) => {
        const sprint = {...data, todo: [], doing: [], done: [], projectId, id: Math.random().toString()};
        console.log(data)
        // @ts-ignore
        dispatch(addSprint(sprint))
    }

    const handleEditProjectSubmit = (project: Project) => {
        dispatch(updateProject(project))

    }

    const handleCloseProjectModal = () => {
        setModalIsOpen(false)
    }

    return (
        <Container maxWidth="lg" style={{marginTop: '2rem'}}>
            <ProjectForm onSubmit={handleSprintFormSubmit} type='sprint'/>
            {modalIsOpen &&
                <EditProjectModal handleCloseProjectModal={handleCloseProjectModal} project={project}
                                  open={modalIsOpen}
                                  onSubmit={handleEditProjectSubmit}
                />
            }
            <Button type="button" onClick={() => setModalIsOpen(true)}>Редактировать</Button>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Link to={`/project/${projectId}/backlog`}>
                        <Paper>Backlog</Paper>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {project && project.sprints.map(sprint => (
                        <Link to={`/project/${projectId}/sprint/${sprint.id}`}>
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