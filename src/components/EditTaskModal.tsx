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
            <DialogTitle>Редактирование таски</DialogTitle>
            <form onSubmit={handleSubmit(handleSave)}
                  style={{display: "flex", flexDirection: "column", gap: '1rem'}}>
                <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}} defaultValue={task.estimation}>
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

export default EditTaskModal;