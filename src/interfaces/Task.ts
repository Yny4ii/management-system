export interface Task {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    storyPoint: string;
    projectId: string;
    sprintId?: string;
}