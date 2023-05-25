import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Container, Grid, TextField} from "@mui/material";
import ProjectForm, {IFormValues} from "../components/ProjectForm";
import {addProject} from "../redux/slices/projectsSlice";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import ProjectCard from "../components/ProjectCard";
import {useTranslation} from "react-i18next";


function HomePage() {
    const {t} = useTranslation()

    const dispatch = useAppDispatch();
    const {project} = useAppSelector(state => state);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProjects, setFilteredProjects] = useState(project);

    useEffect(() => {
        setFilteredProjects(project.filter(project => project.id.toString().includes(searchTerm) || project.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [project])

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setFilteredProjects(project.filter(project => project.id.toString().includes(searchTerm) || project.title.toLowerCase().includes(searchTerm.toLowerCase())));
    };

    const handleProjectFormSubmit = (data: IFormValues) => {
        const project = {...data, id: Math.random().toString(), backlog: [], sprints: []}
        dispatch(addProject(project))
    }

    return (
        <Container maxWidth="lg">
            <ProjectForm onSubmit={handleProjectFormSubmit} type={'sprint'}/>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <form onSubmit={handleSearchSubmit} style={{display: 'flex', marginTop: '1rem'}}>
                        <TextField label={t('searchInputPlaceholder')} variant="outlined" size="small" fullWidth value={searchTerm}
                                   onChange={handleSearchChange}/>
                        <Button type="submit" variant="contained" color="primary"
                                style={{marginLeft: '1rem'}}>{t("findButtonTitle")}</Button>
                    </form>
                </Grid>
                {filteredProjects.map(project => (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                        <ProjectCard project={project}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default HomePage;