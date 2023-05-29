import React from "react";
import { Container, Grid, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import TaskCard from "../components/TaskCard";

const SprintPage = () => {
  const { projectId, sprintId } = useParams();

  const project = useAppSelector((state) =>
    state.project.find((project) => project.id === projectId)
  );
  const sprint = project?.sprints.find((sprint) => sprint.id === sprintId);
  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>Todo</Paper>
          {sprint?.todo.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>Doing</Paper>
          {sprint?.doing.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>Done</Paper>
          {sprint?.done.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SprintPage;