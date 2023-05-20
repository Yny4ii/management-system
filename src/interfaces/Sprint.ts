import {Task} from "./Task";

export interface Sprint {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    todo: Task[];
    doing: Task[];
    done: Task[];
    projectId: string;
}