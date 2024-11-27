import projects from '../mockData/projects.json';
import { Project } from '../types/models/project.model';

class ProjectRepository{
    async getAllProjects() : Promise<Project[]>{
        const data = projects;
        return data;
    }
}

export const projectRepository = new ProjectRepository();