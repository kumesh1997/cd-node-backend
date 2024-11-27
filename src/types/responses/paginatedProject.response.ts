import { Project } from "../models/project.model";

export interface PaginatedResponse {
    total: number;
    page: number;
    limit: number;
    data: Project[];
  }