export interface Task {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  estimation: string;
  projectId: string;
  sprintId?: string;
}