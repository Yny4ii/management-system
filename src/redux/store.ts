import {configureStore} from "@reduxjs/toolkit";
import projectReducer from './slices/projectsSlice'
import {saveToLocalStorage} from "../hooks/sateToLocalStorage";
import {loadFromLocalStorage} from "../hooks/loadFromLocalStorage";

const persistedState = loadFromLocalStorage()
export const store = configureStore({
    reducer: {
        project: projectReducer,
        preloadState: persistedState
    }
})
store.subscribe(() => {
    saveToLocalStorage(store.getState())
})
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;