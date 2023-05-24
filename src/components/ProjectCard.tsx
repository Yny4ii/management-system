import React, {useState} from 'react';
import {Button, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import EditProjectModal from "./EditProjectModal";
import {Project} from "../interfaces/Project";
import {deleteProject, updateProject} from "../redux/slices/projectsSlice";
import {useAppDispatch} from "../hooks/hooks";

interface IProjectCardProps {
    project: Project,
}

const ProjectCard = ({project}: IProjectCardProps) => {
    const dispatch = useAppDispatch()
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const handleDeleteProject = () => {
        dispatch(deleteProject(project.id))
    }

    const handleEditProjectSubmit = (project: Project) => {
        dispatch(updateProject(project))
    }

    const handleCloseProjectModal = () => {
        setModalIsOpen(false)
    }

    return (
        <> <EditProjectModal open={modalIsOpen} project={project} handleCloseProjectModal={handleCloseProjectModal}
                             onSubmit={handleEditProjectSubmit}/>
            <Card>
                <CardActionArea>
                    <Link to={`/project/${project.id}`}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Title:
                                {project.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Description:
                                {project.description}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Timestamp:
                                {project.timestamp}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                Id:
                                {project.id}
                            </Typography>
                        </CardContent>
                    </Link>
                    <Button type="button" onClick={() => setModalIsOpen(true)}>Редактировать</Button>
                    <Button type="button" onClick={handleDeleteProject}>Удалить</Button>
                </CardActionArea>
            </Card>
        </>

    );
};

export default ProjectCard;