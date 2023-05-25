import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {IFormValues} from "./ProjectForm";
import {Sprint} from "../interfaces/Sprint";
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation()
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
            <DialogTitle>{t('editSprintFormTitle')}</DialogTitle>
            <form onSubmit={handleSubmit(handleSave)}
                  style={{display: "flex", flexDirection: "column", gap: '1rem'}}>
                <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <TextField
                        label={t('cardTitle')}
                        required
                        {...register("title")}
                    />
                    <TextField
                        label={t('cardDescription')}
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
                        {t('cancelButtonTitle')}
                    </Button>
                    <Button color="primary" type='submit'>
                        {t('saveButtonTitle')}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditSprintModal;