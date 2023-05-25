import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Radio, RadioGroup,
    TextField
} from "@mui/material";
import {Project} from "../interfaces/Project";
import {useForm} from "react-hook-form";
import {IFormValues} from "./ProjectForm";
import {Task} from "../interfaces/Task";
import {useTranslation} from "react-i18next";

export interface IEdiTaskModalValues {
    title: string,
    description: string,
    timestamp: string;
    estimation: string;
}

interface IEditProjectModalProps {
    open: boolean;
    task: Task;
    handleCloseTaskModal: () => void;
    onSubmit: (task: Task) => void;
}

const EditTaskModal = ({task, open, handleCloseTaskModal, onSubmit}: IEditProjectModalProps) => {
    const {t} = useTranslation()
    const form = useForm<IFormValues>({
        defaultValues: {
            title: task.title,
            description: task.description,
            timestamp: task.timestamp,
            estimation: task.estimation
        }
    })

    const {register, handleSubmit} = form;
    const handleSave = (data: IEdiTaskModalValues) => {
        const updatedTask = {...task, title: data.title, description: data.description, timestamp: data.timestamp, estimation: data.estimation}
        onSubmit(updatedTask)
        handleCloseTaskModal()
    }

    return (
        <Dialog open={open} onClose={handleCloseTaskModal}>
            <DialogTitle>{t('editTaskFormTitle')}</DialogTitle>
            <form onSubmit={handleSubmit(handleSave)}
                  style={{display: "flex", flexDirection: "column", gap: '1rem'}}>
                <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}} defaultValue={task.estimation}>
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
                    <RadioGroup row name="estimation">
                        <FormControlLabel
                            value="1"
                            control={
                                <Radio
                                    {...register("estimation")}
                                    required
                                />
                            }
                            label="1"
                        />
                        <FormControlLabel
                            value="2"
                            control={
                                <Radio
                                    {...register("estimation")}
                                    required
                                />
                            }
                            label="2"
                        />
                        <FormControlLabel
                            value="3"
                            control={
                                <Radio
                                    {...register("estimation")}
                                    required
                                />
                            }
                            label="3"
                        />
                        <FormControlLabel
                            value="4"
                            control={
                                <Radio
                                    {...register("estimation")}
                                    required
                                />
                            }
                            label="4"
                        />
                        <FormControlLabel
                            value="5"
                            control={
                                <Radio
                                    {...register("estimation")}
                                    required
                                />
                            }
                            label="5"
                        />
                    </RadioGroup>
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

export default EditTaskModal;