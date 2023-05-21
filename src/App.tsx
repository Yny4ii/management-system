import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import ProjectPage from "./pages/ProjectPage";
import SprintPage from "./pages/SprintPage";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path='project/:id' element={<ProjectPage/>}/>
                <Route path='project/:id/sprint/:sprintId' element={<SprintPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
