import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {IFormValues} from "./ProjectForm";
import {Sprint} from "../interfaces/Sprint";

export interface IEditSprintModalValues {
    title: string,
    description: string,
    timestamp: string;
}

interface IEditSprintModalProps {
    open: boolean;
    sprint: Sprint;
    handleCloseTaskModal: () => void;
    onSubmit: (data: Sprint) => void;
}

const EditSprintModal = ({sprint, open, handleCloseTaskModal, onSubmit}: IEditSprintModalProps) => {

    const form = useForm<IFormValues>({
        defaultValues: {
            title: sprint.title,
            description: sprint.description,
            timestamp: sprint.timestamp
        }
    })

    const {register, handleSubmit} = form;
    const handleSave = (data: IEditSprintModalValues) => {
        const updatedSprint = {...sprint, title: data.title, description: data.description, timestamp: data.timestamp}
        onSubmit(updatedSprint)
        handleCloseTaskModal()
    }

    return (
        <Dialog open={open} onClose={handleCloseTaskModal}>
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
                    <Button color="primary" onClick={handleCloseTaskModal} type='button'>
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

export default EditSprintModal;