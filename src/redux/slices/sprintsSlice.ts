import {Sprint} from "../../interfaces/Sprint";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Task} from "../../interfaces/Task";
import {Category} from "../../interfaces/Category";

interface IAddTaskToSprint {
    sprintId: string;
    task: Task;
    category: Category;
}

interface IRemoveTaskFromSprint {
    sprintId: string;
    taskId: string;
    category: Category;
}

interface InitialState {
    sprints: Sprint[]
}

const initialState: InitialState = {
    sprints: []
}


const sprintsSlice = createSlice({
    name: 'sprints',
    initialState: initialState.sprints,
    reducers: {
        addSprint: (state, action: PayloadAction<Sprint>) => {
            state.push(action.payload)
        },
        updateSprint: (state, action: PayloadAction<Sprint>) => {
            const index = state.findIndex((sprint) => sprint.id === action.payload.id)
            if (index !== -1) {
                state[index] = action.payload
            }
        },
        deleteSprint: (state, action: PayloadAction<Sprint>) => {
            state.filter((sprint) => sprint.id !== action.payload.id)
        },
        addTaskToSprint: (state, action: PayloadAction<IAddTaskToSprint>) => {
            const sprintIndex = state.findIndex((sprint) => sprint.id === action.payload.sprintId)
            if (sprintIndex !== -1) {
                const {task, category} = action.payload
                state[sprintIndex][category].push(task)
            }
        },
        removeTaskFromSprint: (state, action: PayloadAction<IRemoveTaskFromSprint>) => {
            const sprintIndex = state.findIndex((sprint) => sprint.id === action.payload.sprintId)
            if (sprintIndex !== -1) {
                const {taskId, category} = action.payload
                state[sprintIndex][category] = state[sprintIndex][category].filter((task) => task.id !== taskId)
            }
        }

    }
})

export const {addSprint, updateSprint, deleteSprint, addTaskToSprint, removeTaskFromSprint} = sprintsSlice.actions;

export default sprintsSlice.reducer;

