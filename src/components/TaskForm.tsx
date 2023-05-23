import {Button, FormControlLabel, Radio, RadioGroup, TextField} from "@mui/material";
import {useForm} from "react-hook-form";


interface ITaskFormProps {
    onSubmit: (date: IFormValues) => void;
}

export interface IFormValues {
    title: string,
    description: string,
    timestamp: string;
    estimation: string;
}


const TaskForm = ({onSubmit}: ITaskFormProps) => {

    const form = useForm<IFormValues>({
        defaultValues: {
            title: "",
            description: "",
            timestamp: new Date().toISOString().slice(0, -8),
            estimation: ''
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
            <Button type="submit" variant="contained" color="primary">Create task</Button>
        </form>
    );
};

export default TaskForm
