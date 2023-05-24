import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select} from "@mui/material";
import {Project} from "../interfaces/Project";
import {useForm} from "react-hook-form";
import {useAppDispatch} from "../hooks/hooks";
import {Category} from "../interfaces/Category";
import {moveTask} from "../redux/slices/projectsSlice";
import {useLocation, useParams} from "react-router-dom";

interface IFormValues {
    backlog?: string,
    sprint: string,
    category: string
}

interface IMoveTaskModalProps {
    open: boolean;
    project: Project;
    taskId: string;
    // handleClose: () => void;
    // onSubmit: (date: Project) => void;
    handleCloseMoveTaskModal: () => void;
    sprintId: string;
}

const MoveTaskModal = ({open, project, taskId, handleCloseMoveTaskModal, sprintId}: IMoveTaskModalProps) => {
    const dispatch = useAppDispatch()
    const location = useLocation()


    const form = useForm<IFormValues>({
        defaultValues: {
            backlog: '',
            sprint: '',
            category: '',
        }
    })

    const {register, handleSubmit} = form;
    const [category, setCategory] = useState<Category>('todo');

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const [selectedType, setSelectedType] = useState('backlog');

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleMoveTaskModalSubmit = (e) => {
        e.preventDefault()
        if(location.pathname.includes('sprint') && selectedType !== 'backlog'){
            console.log('sprint')
            console.log(sprintId)
            console.log(selectedType)
            dispatch(moveTask({projectId: project.id, taskId, sprintIdFrom: sprintId,sprintIdTo:selectedType, category}));
        }

        else if (selectedType === 'backlog') {
            console.log('backlog')
            dispatch(moveTask({projectId: project.id, taskId, sprintIdFrom: sprintId, category, fromBacklog: false}));
        }
        else if(selectedType === 'backlog' && location.pathname.includes('sprint')){
            console.log(132)
        }
        else {
            dispatch(moveTask({projectId: project.id, taskId, sprintIdFrom: selectedType, category, fromBacklog: true}));
        }
    }


    return (
        <Dialog open={open} onClose={handleCloseMoveTaskModal}>
            <DialogTitle>Переместить таску</DialogTitle>
            <form onSubmit={handleMoveTaskModalSubmit}>
                <DialogContent>
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select labelId="type-label" value={selectedType} onChange={handleTypeChange}>
                        <MenuItem value="backlog" {...register('backlog')}>Backlog</MenuItem>
                        {project.sprints.map(sprint => (
                            <MenuItem {...register('sprint')} key={sprint.id}
                                      value={sprint.id}>{sprint.title}</MenuItem>
                        ))}
                    </Select>
                    {selectedType !== 'backlog' && (
                        <>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select labelId="category-label" value={category} onChange={handleCategoryChange}>
                                <MenuItem {...register('category')} value="todo">To Do</MenuItem>
                                <MenuItem {...register('category')} value="doing">Doing</MenuItem>
                                <MenuItem {...register('category')} value="done">Done</MenuItem>
                            </Select>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleCloseMoveTaskModal} type='button'>
                        Отмена
                    </Button>
                    <Button color="primary" type='submit'>
                        Переместить
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default MoveTaskModal;