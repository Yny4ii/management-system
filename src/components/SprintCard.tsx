import React, { useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Sprint } from "../interfaces/Sprint";
import { useAppDispatch } from "../hooks/hooks";
import { deleteSprint, updateSprint } from "../redux/slices/projectsSlice";
import { useTranslation } from "react-i18next";
import EditModal, { IEditModalValues } from "./EditModal";

interface ISprintCardProps {
  sprint: Sprint;
  projectId: string;
}

const SprintCard = ({ sprint, projectId }: ISprintCardProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleEditSprintSubmit = (data: IEditModalValues) => {
    const updatedSprint = {
      ...sprint,
      ...data,
    };
    dispatch(updateSprint(updatedSprint));
  };

  const handleCloseSprintModal = () => {
    setModalIsOpen(false);
  };

  const handleDeleteSprint = () => {
    dispatch(deleteSprint({ sprintId: sprint.id, projectId }));
  };

  return (
    <>
      <EditModal
        type="sprint"
        object={sprint}
        handleCloseEditModal={handleCloseSprintModal}
        open={modalIsOpen}
        onSubmit={handleEditSprintSubmit}
      />
      <Card key={sprint.id}>
        <Link to={`/project/${projectId}/sprint/${sprint.id}`}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {t("cardTitle")}:{sprint.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {t("cardDescription")}:{sprint.description}
            </Typography>
            <Typography color="textSecondary">
              {t("cardTimestamp")}:{sprint.timestamp}
            </Typography>
          </CardContent>
        </Link>
        <CardActionArea>
          <Button type="button" onClick={() => setModalIsOpen(true)}>
            {t("editButtonTitle")}
          </Button>
          <Button type="button" onClick={handleDeleteSprint}>
            {t("deleteButtonTitle")}
          </Button>
        </CardActionArea>
      </Card>
    </>
  );
};

export default SprintCard;
