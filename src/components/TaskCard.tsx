import React, {useState} from 'react';
import {Button, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {deleteTask, updateTask} from "../redux/slices/projectsSlice";
import EditTaskModal from "./EditTaskModal";
import {Task} from "../interfaces/Task";
import MoveTaskModal from "./MoveTaskModal";
import {useTranslation} from "react-i18next";

interface ITaskProps {
    task: Task
}

const TaskCard = ({task}: ITaskProps) => {
    const {t} = useTranslation()
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

    const handleCloseEditTaskModal = () => {
        setModalEditIsOpen(false)
    }

    const handleEditProjectSubmit = (task: Task) => {
        dispatch(updateTask(task))
    }

    return (
        <>
            <EditTaskModal open={modalEditIsOpen} task={task} handleCloseTaskModal={handleCloseEditTaskModal}
                           onSubmit={handleEditProjectSubmit}/>
            <MoveTaskModal taskId={task.id} project={project} sprintId={sprintId}
                           handleCloseMoveTaskModal={handleCloseMoveTaskModal} open={modalMoveTaskIsOpen}/>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {t('cardTitle')}:
                        {task.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {t('cardDescription')}:
                        {task.description}
                    </Typography>
                    <Typography color="textSecondary">
                        {t('cardTimestamp')}:
                        {task.timestamp}
                    </Typography>
                    <Typography color="textSecondary">
                        {t('cardEstimation')}:
                        {task.estimation}
                    </Typography>
                </CardContent>
                <CardActionArea>
                    <Button type='button' onClick={() => {
                        setModalMoveTaskIsOpen(true)
                    }}>{t('moveButtonTitle')}</Button>
                    <Button type='button' onClick={() => {
                        setModalEditIsOpen(true)
                    }}>{t('editButtonTitle')}</Button>
                    <Button type='button' onClick={handleDeleteTask}>{t('deleteButtonTitle')}</Button>
                </CardActionArea>
            </Card>
        </>
    );
};
export default TaskCard;