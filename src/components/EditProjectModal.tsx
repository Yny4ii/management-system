import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Project } from "../interfaces/Project";
import { useForm } from "react-hook-form";
import { IFormValues } from "./AddForm";
import { useTranslation } from "react-i18next";

export interface IEditProjectModalValues {
  title: string;
  description: string;
  timestamp: string;
}

interface IEditProjectModalProps {
  open: boolean;
  project: Project;
  handleCloseProjectModal: () => void;
  onSubmit: (data: Project) => void;
}

const EditProjectModal = ({
  project,
  open,
  handleCloseProjectModal,
  onSubmit,
}: IEditProjectModalProps) => {
  const { t } = useTranslation();
  const form = useForm<IFormValues>({
    defaultValues: {
      title: project.title,
      description: project.description,
      timestamp: project.timestamp,
    },
  });

  const { register, handleSubmit } = form;
  const handleSave = (data: IEditProjectModalValues) => {
    const updatedProject = {
      ...project,
      title: data.title,
      description: data.description,
      timestamp: data.timestamp,
    };
    onSubmit(updatedProject);
    handleCloseProjectModal();
  };

  return (
    <Dialog open={open} onClose={handleCloseProjectModal}>
      <DialogTitle>{t("editProjectFormTitle")}</DialogTitle>
      <form
        onSubmit={handleSubmit(handleSave)}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField label={t("cardTitle")} required {...register("title")} />
          <TextField
            label={t("cardDescription")}
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
          <Button
            color="primary"
            onClick={handleCloseProjectModal}
            type="button"
          >
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

export default EditProjectModal;