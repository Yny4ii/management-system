import {useEffect, useState} from 'react';
import {Button, Container, Grid, TextField} from "@mui/material";
import ProjectForm, {IFormValues} from "../components/ProjectForm";
import {addProject} from "../redux/slices/projectsSlice";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import ProjectCard from "../components/ProjectCard";
import {Link} from "react-router-dom";


function HomePage() {
    const dispatch = useAppDispatch();
    const {project} = useAppSelector(state => state);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProjects, setFilteredProjects] = useState(project);

    useEffect(()=>{
        setFilteredProjects(project.filter(project => project.id.toString().includes(searchTerm) || project.title.toLowerCase().includes(searchTerm.toLowerCase())));
    },[project])


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setFilteredProjects(project.filter(project => project.id.toString().includes(searchTerm) || project.title.toLowerCase().includes(searchTerm.toLowerCase())));
    };

    const handleProjectFormSubmit = (date: IFormValues) => {
        const project = {...date, id: Math.random().toString(), backlog: [], sprints: []}
        dispatch(addProject(project))
    }

    return (
        <Container maxWidth="lg" style={{marginTop: '2rem'}}>
            <ProjectForm onSubmit={handleProjectFormSubmit}/>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <form onSubmit={handleSearchSubmit} style={{display: 'flex', marginTop: '1rem'}}>
                        <TextField label="Search" variant="outlined" size="small" fullWidth value={searchTerm}
                                   onChange={handleSearchChange}/>
                        <Button type="submit" variant="contained" color="primary"
                                style={{marginLeft: '1rem'}}>Find</Button>
                    </form>
                </Grid>
                {filteredProjects.map(project => (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                        <Link to={`/project/:${project.id}`}>
                            <ProjectCard description={project.description} title={project.title}
                                         timestamp={project.timestamp} id={project.id}/>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default HomePage;