import {Project} from "../../interfaces/Project";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Category} from "../../interfaces/Category";
import {saveToLocalStorage} from "../../hooks/sateToLocalStorage";
import {loadFromLocalStorage} from "../../hooks/loadFromLocalStorage";


interface InitialState {
    projects: Project[]
}

const initialState: InitialState = {
    projects: loadFromLocalStorage().project || []
}
const projectsSlice = createSlice({
        name: 'projects',
        initialState: initialState.projects,
        reducers: {
            addProject: (state, action: PayloadAction<Project>) => {
                state.push(action.payload)
                saveToLocalStorage(state)
            },
            updateProject: (state, action: PayloadAction<Project>) => {
                const projectIndex = state.findIndex((project) => project.id === action.payload.id);
                if (projectIndex !== -1) {
                    state[projectIndex] = action.payload;
                }

            },
            deleteProject: (state, action) => {
                const projectId = action.payload
                return state.filter((project) => project.id !== projectId);
            },

            moveTask: (state, action: PayloadAction<{ projectId: string; taskId: string; sprintIdFrom?: string; sprintIdTo?: string; category: Category, fromBacklog?: boolean }>) => {
                const {projectId, taskId, sprintIdFrom, category, fromBacklog, sprintIdTo} = action.payload;
                const projectIndex = state.findIndex(project => project.id === projectId)
                const project = state[projectIndex]

                if (fromBacklog) {
                    const sprintIndex = project.sprints.findIndex((sprint) => (sprint.id === sprintIdFrom));
                    const sprint = project.sprints[sprintIndex];

                    const taskIndexFromBacklog = project.backlog.findIndex(task => task.id === taskId)
                    const taskFromBacklog = project.backlog[taskIndexFromBacklog]
                    project.backlog.splice(taskIndexFromBacklog, 1)
                    sprint[category].push(taskFromBacklog)
                } else if (fromBacklog === false) {
                    const sprintIndex = project.sprints.findIndex((sprint) => (sprint.id === sprintIdFrom));
                    const sprint = project.sprints[sprintIndex];
                    const taskIndexFromTodoSprint = sprint.todo.findIndex(task => task.id === taskId)
                    const taskIndexFromDoingSprint = sprint.doing.findIndex(task => task.id === taskId)
                    const taskIndexFromDoneSprint = sprint.done.findIndex(task => task.id === taskId)

                    if (taskIndexFromTodoSprint !== -1) {
                        const taskFromTodoSprint = sprint.todo[taskIndexFromTodoSprint];
                        sprint.todo.splice(taskIndexFromTodoSprint, 1)
                        project.backlog.push(taskFromTodoSprint)
                    } else if (taskIndexFromDoingSprint !== -1) {
                        const taskFromDoingSprint = sprint.doing[taskIndexFromDoingSprint];
                        sprint.doing.splice(taskIndexFromDoingSprint, 1)
                        project.backlog.push(taskFromDoingSprint)
                    } else if (taskIndexFromDoneSprint !== -1) {
                        const taskFromDoneSprint = sprint.done[taskIndexFromDoneSprint];
                        sprint.done.splice(taskIndexFromTodoSprint, 1)
                        project.backlog.push(taskFromDoneSprint)
                    }
                }
                if (sprintIdTo) {
                    const sprintIndexTo = project.sprints.findIndex(sprint => (sprint.id === sprintIdTo))
                    const sprintTo = project.sprints[sprintIndexTo]
                    const sprintIndex = project.sprints.findIndex((sprint) => (sprint.id === sprintIdFrom));
                    const sprint = project.sprints[sprintIndex];
                    const taskIndexFromTodoSprint = sprint.todo.findIndex(task => task.id === taskId)
                    const taskIndexFromDoingSprint = sprint.doing.findIndex(task => task.id === taskId)
                    const taskIndexFromDoneSprint = sprint.done.findIndex(task => task.id === taskId)

                    if (taskIndexFromTodoSprint !== -1) {
                        const taskFromTodoSprint = sprint.todo[taskIndexFromTodoSprint];
                        sprint.todo.splice(taskIndexFromTodoSprint, 1)
                        sprintTo[category].push(taskFromTodoSprint)
                    } else if (taskIndexFromDoingSprint !== -1) {
                        const taskFromDoingSprint = sprint.doing[taskIndexFromDoingSprint];
                        sprint.doing.splice(taskIndexFromDoingSprint, 1)
                        sprintTo[category].push(taskFromDoingSprint)
                    } else if (taskIndexFromDoneSprint !== -1) {
                        const taskFromDoneSprint = sprint.done[taskIndexFromDoneSprint];
                        sprint.done.splice(taskIndexFromTodoSprint, 1)
                        sprintTo[category].push(taskFromDoneSprint)
                    }
                }
            },
            deleteTask: (state, action) => {
                const taskId = action.payload;
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
            },
            addSprint: (state, action) => {
                const sprint = action.payload;
                const projectIndex = state.findIndex((project) => project.id === sprint.projectId);
                if (projectIndex !== -1) {
                    state[projectIndex].sprints.push(sprint);
                }
            },
            deleteSprint: (state, action) => {
                const {sprintId, projectId} = action.payload;
                const projectIndex = state.findIndex((project) => project.id === projectId)
                if (projectIndex !== -1) {
                    state[projectIndex].sprints = state[projectIndex].sprints.filter((sprint) => sprint.id !== sprintId);
                }
            },
            addTask: (state, action) => {
                const task = action.payload;
                const projectIndex = state.findIndex((project) => project.id === task.projectId);
                if (projectIndex !== -1) {
                    state[projectIndex].backlog.push(task);
                }
            },
            updateTask: (state, action) => {
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
            },
            updateSprint: (state, action) => {
                const sprint = action.payload;
                const projectIndex = state.findIndex((project) => project.id === sprint.projectId);
                if (projectIndex !== -1) {
                    const sprintIndex = state[projectIndex].sprints.findIndex((p) => p.id === sprint.id);
                    if (sprintIndex !== -1) {
                        state[projectIndex].sprints[sprintIndex] = sprint;
                    }
                }
            }
        }
    }
);


export const {
    addProject,
    updateProject,
    deleteProject,
    moveTask,
    deleteTask,
    addSprint,
    deleteSprint,
    addTask,
    updateTask,
    updateSprint
} = projectsSlice.actions;

export default projectsSlice.reducer;
