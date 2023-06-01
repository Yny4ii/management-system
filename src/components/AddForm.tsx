import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export type ObjectType = "project" | "sprint" | "task";

interface ITaskFormProps {
  onSubmit: (data: IFormValues) => void;
  type: ObjectType;
}

export interface IFormValues {
  title: string;
  description: string;
  timestamp: string;
  estimation: string;
}

const AddForm = ({ onSubmit, type }: ITaskFormProps) => {
  const { t } = useTranslation();
  const form = useForm<IFormValues>({
    defaultValues: {
      title: "",
      description: "",
      timestamp: new Date().toISOString(),
      estimation: "",
    },
  });
  const { handleSubmit, control } = form;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField {...field} label={t("cardTitle")} required />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField {...field} label={t("cardDescription")} required />
        )}
      />
      <Controller
        name="timestamp"
        control={control}
        render={({ field }) => (
          <TextField type="datetime-local" {...field} required />
        )}
      />
      {type === "task" && (
        <Controller
          name="estimation"
          control={control}
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel
                value="1"
                control={<Radio required />}
                label="1"
              />
              <FormControlLabel
                value="2"
                control={<Radio required />}
                label="2"
              />
              <FormControlLabel
                value="3"
                control={<Radio required />}
                label="3"
              />
              <FormControlLabel
                value="4"
                control={<Radio required />}
                label="4"
              />
              <FormControlLabel
                value="5"
                control={<Radio required />}
                label="5"
              />
            </RadioGroup>
          )}
        />
      )}
      <Button type="submit" variant="contained" color="primary">
        {t("createButtonTitle")}
      </Button>
    </form>
  );
};

export default AddForm;
