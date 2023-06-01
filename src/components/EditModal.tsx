import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ObjectType } from "./AddForm";
import { Task } from "../interfaces/Task";
import { useTranslation } from "react-i18next";
import { Sprint } from "../interfaces/Sprint";
import { Project } from "../interfaces/Project";

export interface IEditModalValues {
  title: string;
  description: string;
  timestamp: string;
  estimation?: string;
}

interface IEditModalProps {
  type: ObjectType;
  open: boolean;
  object: Task | Project | Sprint;
  handleCloseEditModal: () => void;
  onSubmit: (obj: IEditModalValues) => void;
}

const EditModal = ({
  object,
  open,
  handleCloseEditModal,
  onSubmit,
  type,
}: IEditModalProps) => {
  const { t } = useTranslation();
  const form = useForm<IEditModalValues>({
    defaultValues: object,
  });

  const { handleSubmit, control } = form;
  const handleSave = (data: IEditModalValues) => {
    onSubmit(data);
    handleCloseEditModal();
  };

  return (
    <Dialog open={open} onClose={handleCloseEditModal}>
      <DialogTitle>{t("editTaskFormTitle")}</DialogTitle>
      <form
        onSubmit={handleSubmit(handleSave)}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
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
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleCloseEditModal} type="button">
            {t("cancelButtonTitle")}
          </Button>
          <Button color="primary" type="submit">
            {t("saveButtonTitle")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditModal;
