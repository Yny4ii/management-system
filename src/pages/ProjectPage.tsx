import React from "react";
import { Container, Grid, Paper } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import AddForm, { IFormValues } from "../components/AddForm";
import SprintCard from "../components/SprintCard";
import { addSprint } from "../redux/slices/projectsSlice";

function ProjectPage() {
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const project = useAppSelector((state) =>
    state.project.find((project) => project.id === projectId)
  );

  const handleSprintFormSubmit = (data: IFormValues) => {
    const sprint = {
      title: data.title,
      description: data.description,
      timestamp: data.timestamp,
      todo: [],
      doing: [],
      done: [],
      projectId,
      id: Math.random().toString(),
    };
    dispatch(addSprint(sprint));
  };

  return (
    <Container maxWidth="lg">
      <AddForm onSubmit={handleSprintFormSubmit} type="sprint" />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Link to={`/project/${projectId}/backlog`}>
            <Paper>Backlog</Paper>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6}>
          {projectId &&
            project &&
            project.sprints.map((sprint) => (
              <SprintCard sprint={sprint} projectId={projectId} />
            ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProjectPage;
