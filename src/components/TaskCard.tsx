import React from 'react';
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";

interface ITaskProps {
    title: string;
    description: string;
    timestamp: string;
    estimation: string;
}

const TaskCard = ({title, description, timestamp, estimation}: ITaskProps) => {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                    <Typography color="textSecondary">
                        {timestamp}
                    </Typography>
                    <Typography color="textSecondary">
                        {estimation}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
export default TaskCard;