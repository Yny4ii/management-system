import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Task} from "../../interfaces/Task";

interface InitialState {
    tasks: Task[]
}

const initialState: InitialState = {
    tasks: []
}


const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState.tasks,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.push(action.payload)
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.findIndex((task) => task.id === action.payload.id)
            if (index !== -1) {
                state[index] = action.payload
            }
        },
        deleteTask: (state, action: PayloadAction<Task>) => {
            state.filter((task) => task.id !== action.payload.id)
        },
    }
})

export const {addTask, updateTask, deleteTask} = tasksSlice.actions;
export default tasksSlice.reducer