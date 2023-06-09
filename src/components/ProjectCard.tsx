import React, { useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Project } from "../interfaces/Project";
import { deleteProject, updateProject } from "../redux/slices/projectsSlice";
import { useAppDispatch } from "../hooks/hooks";
import { useTranslation } from "react-i18next";
import EditModal, { IEditModalValues } from "./EditModal";

interface IProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: IProjectCardProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDeleteProject = () => {
    dispatch(deleteProject(project.id));
  };

  const handleEditProjectSubmit = (data: IEditModalValues) => {
    const updatedProject = {
      ...project,
      ...data,
    };
    dispatch(updateProject(updatedProject));
  };

  const handleCloseProjectModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <EditModal
        type="project"
        open={modalIsOpen}
        object={project}
        handleCloseEditModal={handleCloseProjectModal}
        onSubmit={handleEditProjectSubmit}
      />
      <Card>
        <Link to={`/project/${project.id}`}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {t("cardTitle")}:{project.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {t("cardDescription")}:{project.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {t("cardTimestamp")}:{project.timestamp}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Id:
              {project.id}
            </Typography>
          </CardContent>
        </Link>
        <CardActionArea>
          <Button type="button" onClick={() => setModalIsOpen(true)}>
            {t("editButtonTitle")}
          </Button>
          <Button type="button" onClick={handleDeleteProject}>
            {t("deleteButtonTitle")}
          </Button>
        </CardActionArea>
      </Card>
    </>
  );
};

export default ProjectCard;
