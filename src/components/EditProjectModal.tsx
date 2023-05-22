import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {Project} from "../interfaces/Project";
import {useForm} from "react-hook-form";
import {IFormValues} from "./ProjectForm";

export interface IEditProjectModalValues {
    title: string,
    description: string,
    timestamp: string;
}

interface IEditProjectModalProps {
    open: boolean;
    project: Project;
    handleCloseProjectModal: () => void;
    onSubmit: (date: Project) => void;
}

const EditProjectModal = ({project, open, handleCloseProjectModal, onSubmit}: IEditProjectModalProps) => {
    console.log(project)

    const form = useForm<IFormValues>({
        defaultValues: {
            title: project.title,
            description: project.description,
            timestamp: project.timestamp
        }
    })

    const {register, handleSubmit} = form;
    const handleSave = (date: IEditProjectModalValues) => {
        const updatedProject = {...project, title: date.title, description: date.description, timestamp: date.timestamp}
        onSubmit(updatedProject)
        handleCloseProjectModal()
    }

    return (
        <Dialog open={open} onClose={handleCloseProjectModal}>
            <DialogTitle>Редактирование проекта</DialogTitle>
            <form onSubmit={handleSubmit(handleSave)}
                  style={{display: "flex", flexDirection: "column", gap: '1rem'}}>
                <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <TextField
                        label="Title"
                        required
                        {...register("title")}
                    />
                    <TextField
                        label="Description"
                        required
                        {...register("description")}
                    />
                    <TextField
                        type="datetime-local"
                        required
                        {...register("timestamp")}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleCloseProjectModal} type='button'>
                        Отмена
                    </Button>
                    <Button color="primary" type='submit'>
                        Сохранить
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditProjectModal;