import React, {useState} from 'react';
import {Button, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Sprint} from "../interfaces/Sprint";
import {useAppDispatch} from "../hooks/hooks";
import {deleteSprint, updateSprint} from "../redux/slices/projectsSlice";
import EditSprintModal from "./EditSprintModal";

interface ISprintCardProps {
    sprint: Sprint;
    projectId: string
}

const SprintCard = ({sprint, projectId}: ISprintCardProps) => {
    const dispatch = useAppDispatch()
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const handleEditSprintSubmit = (sprint: Sprint) => {
        dispatch(updateSprint(sprint))

    }

    const handleCloseSprintModal = () => {
        setModalIsOpen(false)
    }

    const handleDeleteSprint = () => {
        dispatch(deleteSprint(sprint.id))
    }

    return (
        <>
            <EditSprintModal sprint={sprint} handleCloseTaskModal={handleCloseSprintModal} open={modalIsOpen}
                             onSubmit={handleEditSprintSubmit}/>
            <Card key={sprint.id}>
                <CardActionArea>
                    <Link to={`/project/${projectId}/sprint/${sprint.id}`}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {sprint.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {sprint.description}
                            </Typography>
                            <Typography color="textSecondary">
                                {sprint.timestamp}
                            </Typography>
                        </CardContent>
                    </Link>
                    <Button type="button" onClick={() => setModalIsOpen(true)}>Редактировать</Button>
                    <Button type="button" onClick={handleDeleteSprint}>Удалить</Button>
                </CardActionArea>
            </Card>
        </>
    );
};

export default SprintCard;