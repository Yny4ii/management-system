import {Project} from "../../interfaces/Project";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTask, deleteTask, updateTask} from "./tasksSlice";
import {addSprint, deleteSprint, removeTaskFromSprint, updateSprint} from "./sprintsSlice";

interface InitialState {
    project: Project[]
}

const initialState: InitialState = {
    project: []
}

const projectsSlice = createSlice({
    name: 'projects',
    initialState: initialState.project,
    reducers: {
        addProject: (state, action: PayloadAction<Project>) => {
            state.push(action.payload)
        },
        updateProject: (state, action: PayloadAction<Project>) => {
            const projectIndex = state.findIndex((project) => project.id === action.payload.id);
            if (projectIndex !== -1) {
                state[projectIndex] = action.payload;
            }
        },
        deleteProject: (state, action: PayloadAction<string>) => {
            state.filter((project) => project.id !== action.payload);
        },
    },

    extraReducers: (builder) => {
        builder.addCase(addTask, (state, action) => {
            const task = action.payload;
            const projectIndex = state.findIndex((project) => project.id === task.projectId);
            if (projectIndex !== -1) {
                state[projectIndex].backlog.push(task);
            }
        }).addCase(updateTask, (state, action) => {
            const task = action.payload;
            const projectIndex = state.findIndex((project) => project.id === task.projectId);
            if (projectIndex !== -1) {
                const backlogIndex = state[projectIndex].backlog.findIndex((backlogTask) => backlogTask.id === task.id);
                if (backlogIndex !== -1) {
                    state[projectIndex].backlog[backlogIndex] = task;
                } else {
                    const sprint = state[projectIndex].sprints.find((sprint) => sprint.id === task.sprintId);
                    if (sprint) {
                        const {todo, doing, done} = sprint;
                        const todoIndex = todo.findIndex((todoTask) => todoTask.id === task.id);
                        const doingIndex = doing.findIndex((doingTask) => doingTask.id === task.id);
                        const doneIndex = done.findIndex((doneTask) => doneTask.id === task.id);
                        if (todoIndex !== -1) {
                            todo[todoIndex] = task;
                        } else if (doingIndex !== -1) {
                            doing[doingIndex] = task;
                        } else if (doneIndex !== -1) {
                            done[doneIndex] = task;
                        }
                    }
                }
            }
        }).addCase(deleteTask, (state, action) => {
            const taskId = action.payload.id;
            const projectIndex = state.findIndex((project) => project.backlog.some((task) => task.id === taskId));
            if (projectIndex !== -1) {
                state[projectIndex].backlog = state[projectIndex].backlog.filter((task) => task.id !== taskId);
            } else {
                state.forEach((project) => {
                    const sprint = project.sprints.find((sprint) => sprint.todo.some((task) => task.id === taskId)
                        || sprint.doing.some((task) => task.id === taskId)
                        || sprint.done.some((task) => task.id === taskId));
                    if (sprint) {
                        sprint.todo = sprint.todo.filter((task) => task.id !== taskId);
                        sprint.doing = sprint.doing.filter((task) => task.id !== taskId);
                        sprint.done = sprint.done.filter((task) => task.id !== taskId);
                    }
                });
            }
        }).addCase(addSprint, (state, action) => {
            const sprint = action.payload;
            const projectIndex = state.findIndex((project) => project.id === sprint.projectId);
            if (projectIndex !== -1) {
                state[projectIndex].sprints.push(sprint);
            }
        }).addCase(updateSprint, (state, action) => {
            const sprint = action.payload;
            const projectIndex = state.findIndex((project) => project.id === sprint.projectId);
            if (projectIndex !== -1) {
                const sprintIndex = state[projectIndex].sprints.findIndex((p) => p.id === sprint.id);
                if (sprintIndex !== -1) {
                    state[projectIndex].sprints[sprintIndex] = sprint;
                }
            }
        }).addCase(deleteSprint, (state, action) => {
            const sprintId = action.payload.id;
            const projectIndex = state.findIndex((project) => project.sprints.some((sprint) => sprint.id === sprintId));
            if (projectIndex !== -1) {
                state[projectIndex].sprints = state[projectIndex].sprints.filter((sprint) => sprint.id !== sprintId);
            }
        }).addCase(removeTaskFromSprint, (state, action) => {
            const {sprintId, taskId, category} = action.payload;
            const projectIndex = state.findIndex((project) => project.sprints.some((sprint) => sprint.id === sprintId));
            if (projectIndex !== -1) {
                const sprintIndex = state[projectIndex].sprints.findIndex((sprint) => sprint.id === sprintId);
                if (sprintIndex !== -1) {
                    state[projectIndex].sprints[sprintIndex][category] = state[projectIndex].sprints[sprintIndex][category].filter((task) => task.id !== taskId);
                }
            }
        });
    },
});

export const {addProject, updateProject, deleteProject} = projectsSlice.actions;

export default projectsSlice.reducer;
