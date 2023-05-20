import {Button, TextField} from "@mui/material";
import {useForm} from "react-hook-form";

interface IProjectFormProps {
    onSubmit: (date: IFormValues) => void;
}

export interface IFormValues {
    title: string,
    description: string,
    timestamp: string;
}

const ProjectForm = ({onSubmit}: IProjectFormProps) => {

    const form = useForm<IFormValues>({
        defaultValues: {
            title: "",
            description: "",
            timestamp: new Date().toISOString().slice(0, -8),
        }
    })
    const {register, handleSubmit} = form;


    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", flexDirection: "column", gap: '1rem'}}>
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
            <Button type="submit" variant="contained" color="primary">Create Project</Button>
        </form>
    );
};

export default ProjectForm
