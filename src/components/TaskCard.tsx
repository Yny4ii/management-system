import React, {useState} from 'react';
import {Button, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {deleteTask, updateTask} from "../redux/slices/projectsSlice";
import EditTaskModal from "./EditTaskModal";
import {Task} from "../interfaces/Task";
import MoveTaskModal from "./MoveTaskModal";

interface ITaskProps {
    task: Task
}

const TaskCard = ({task}: ITaskProps) => {
    const dispatch = useAppDispatch()
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
    const [modalMoveTaskIsOpen, setModalMoveTaskIsOpen] = useState(false);
    const {projectId, sprintId} = useParams();
    const project = useAppSelector(state => state.project.find(project => project.id === projectId))

    const handleDeleteTask = () => {
        dispatch(deleteTask(task.id))
    }
    const handleCloseMoveTaskModal = () => {
        setModalMoveTaskIsOpen(false)
    }

    const handleEditProjectSubmit = (task: Task) => {
        dispatch(updateTask(task))
    }

    return (
        <>
            <EditTaskModal open={modalEditIsOpen} task={task} handleCloseTaskModal={handleCloseMoveTaskModal}
                           onSubmit={handleEditProjectSubmit}/>
            <MoveTaskModal taskId={task.id} project={project} sprintId={sprintId} handleCloseMoveTaskModal={handleCloseMoveTaskModal} open={modalMoveTaskIsOpen}/>
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
                <Button onClick={()=>{setModalMoveTaskIsOpen(true)}}>Переместить</Button>
                <Button onClick={()=>{setModalEditIsOpen(true)}}>Редактировать</Button>
                <Button onClick={handleDeleteTask}>Удалить</Button>
            </Card>
        </>
    );
};
export default TaskCard;