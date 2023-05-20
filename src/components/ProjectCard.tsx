import React from 'react';
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";

interface IProjectCardProps {
    id:string,

    title: string,
    description: string,
    timestamp: string,
}

const ProjectCard = ({description, timestamp, title, id}: IProjectCardProps) => {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Title:
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Description:
                        {description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Timestamp:
                        {timestamp}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Id:
                        {id}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProjectCard;