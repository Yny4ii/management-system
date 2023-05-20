import {Task} from "./Task";
import {Sprint} from "./Sprint";

export interface Project {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    backlog: Task[];
    sprints: Sprint[];

}