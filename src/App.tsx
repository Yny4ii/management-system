import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import ProjectPage from "./pages/ProjectPage";
import SprintPage from "./pages/SprintPage";
import BacklogPage from "./pages/BacklogPage";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path='project/:projectId' element={<ProjectPage/>}/>
                <Route path='project/:projectId/sprint/:sprintId' element={<SprintPage/>}/>
                <Route path='project/:projectId/backlog' element={<BacklogPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
