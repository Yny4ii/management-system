import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Project } from "../interfaces/Project";
import { useAppDispatch } from "../hooks/hooks";
import { Category } from "../interfaces/Category";
import { moveTask } from "../redux/slices/projectsSlice";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface IMoveTaskModalProps {
  open: boolean;
  project: Project;
  taskId: string;
  handleCloseMoveTaskModal: () => void;
  sprintId: string;
}

const MoveTaskModal = ({
  open,
  project,
  taskId,
  handleCloseMoveTaskModal,
  sprintId,
}: IMoveTaskModalProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { t } = useTranslation();

  const [category, setCategory] = useState<Category>("todo");

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as Category);
  };

  const [selectedType, setSelectedType] = useState("backlog");

  const handleTypeChange = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value);
  };

  const handleMoveTaskModalSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (location.pathname.includes("sprint") && selectedType !== "backlog") {
      dispatch(
        moveTask({
          projectId: project.id,
          taskId,
          sprintIdFrom: sprintId,
          sprintIdTo: selectedType,
          category: category,
        })
      );
    } else if (selectedType === "backlog") {
      dispatch(
        moveTask({
          projectId: project.id,
          taskId,
          sprintIdFrom: sprintId,
          category,
          fromBacklog: false,
        })
      );
    } else if (
      selectedType === "backlog" &&
      location.pathname.includes("sprint")
    ) {
    } else {
      dispatch(
        moveTask({
          projectId: project.id,
          taskId,
          sprintIdFrom: selectedType,
          category,
          fromBacklog: true,
        })
      );
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseMoveTaskModal}>
      <DialogTitle>{t("moveTaskFormTitle")}</DialogTitle>
      <form onSubmit={handleMoveTaskModalSubmit}>
        <DialogContent>
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            value={selectedType}
            onChange={handleTypeChange}
          >
            <MenuItem value="backlog">Backlog</MenuItem>
            {project.sprints.map((sprint) => (
              <MenuItem key={sprint.id} value={sprint.id}>
                {sprint.title}
              </MenuItem>
            ))}
          </Select>
          {selectedType !== "backlog" && (
            <>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={category}
                onChange={handleCategoryChange}
              >
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="doing">Doing</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </Select>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={handleCloseMoveTaskModal}
            type="button"
          >
            {t("cancelButtonTitle")}
          </Button>
          <Button color="primary" type="submit">
            {t("moveButtonTitle")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MoveTaskModal;
