import React, {useState} from 'react';
import {Button, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {deleteTask, updateTask} from "../redux/slices/projectsSlice";
import EditTaskModal from "./EditTaskModal";
import {Task} from "../interfaces/Task";

interface ITaskProps {
    task: Task
}

const TaskCard = ({task}: ITaskProps) => {
    const dispatch = useAppDispatch()
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const {projectId, sprintId} = useParams();
    const project = useAppSelector(state => state.project.find(project => project.id === projectId))

    const handleDeleteTask = () => {
        dispatch(deleteTask(task.id))
    }
    const handleCloseMoveTaskModal = () => {
        setModalIsOpen(false)
    }

    const handleEditProjectSubmit = (task: Task) => {
        dispatch(updateTask(task))
    }

    return (
        <>
            <EditTaskModal open={modalIsOpen} task={task} handleCloseTaskModal={handleCloseMoveTaskModal}
                           onSubmit={handleEditProjectSubmit}/>
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {task.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {task.description}
                        </Typography>
                        <Typography color="textSecondary">
                            {task.timestamp}
                        </Typography>
                        <Typography color="textSecondary">
                            {task.estimation}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Button onClick={()=>{setModalIsOpen(true)}}>Редактировать</Button>
                <Button onClick={handleDeleteTask}>Удалить</Button>
            </Card>
        </>
    );
};
export default TaskCard;