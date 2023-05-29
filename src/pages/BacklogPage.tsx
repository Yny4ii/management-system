import React, { useEffect, useState } from "react";
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import AddForm from "../components/AddForm";
import { useParams } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import { IFormValues } from "../components/AddForm";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { addTask } from "../redux/slices/projectsSlice";
import { Task } from "../interfaces/Task";
import { useTranslation } from "react-i18next";

const BacklogPage = () => {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  const project = useAppSelector((state) =>
    state.project.find((project) => project.id === projectId)
  );
  const [tasks, setTasks] = useState(project?.backlog.slice());
  const [sortType, setSortType] = useState("title");

  const sortTasks = (a: Task, b: Task) => {
    if (sortType === "estimate") {
      return +a.estimation - +b.estimation;
    } else if (sortType === "title") {
      return a.title.localeCompare(b.title);
    } else {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    }
  };

  useEffect(() => {
    const sortedTasks = project?.backlog.slice().sort(sortTasks);
    setTasks(sortedTasks);
  }, [project, sortType]);

  const handleTaskFormSubmit = (data: IFormValues) => {
    const task = {
      title: data.title,
      description: data.description,
      estimation: data.estimation,
      id: Math.random().toString(),
      projectId: projectId,
    };
    dispatch(addTask(task));
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortType(event.target.value);
  };

  return (
    <Container>
      <AddForm onSubmit={handleTaskFormSubmit} type="task" />
      <FormControl sx={{ marginY: "1rem" }}>
        <InputLabel>{t("inputSortBy")}</InputLabel>
        <Select value={sortType} onChange={handleSortChange}>
          <MenuItem value="timestamp">{t("inputSortByDate")}</MenuItem>
          <MenuItem value="estimate">{t("inputSortByEstimation")}</MenuItem>
          <MenuItem value="title">{t("inputSortByTitle")}</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        {tasks?.sort(sortTasks).map((task) => (
          <Grid key={task.id} item xs={12} sm={6} md={4}>
            <TaskCard task={task} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BacklogPage;