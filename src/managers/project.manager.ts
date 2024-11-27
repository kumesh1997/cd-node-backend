import { projectRepository } from "../repository/project.repository";
import { PaginatedRequest } from "../types/requests/paginatedProject.request";
import { PaginatedResponse } from "../types/responses/paginatedProject.response";

class ProjectManager {
  async getPaginatedProjects(
    request: PaginatedRequest
  ): Promise<PaginatedResponse> {
    const allProjects = projectRepository.getAllProjects();
    const page = request.page || 1;
    const limit = request.limit || 10;
    const projectNameFilter = request.projectName?.toLowerCase() || "";
    const createdByFilter = request.createdBy?.toLowerCase() || "";
    const statusFilter = request.status?.toLowerCase() || "";
    const fromDate = request.dateFrom ? new Date(request.dateFrom) : null;
    const toDate = request.dateTo ? new Date(request.dateTo) : null;

    // Filter projects (case-insensitive)
    const filteredProjects = (await allProjects).filter((project) => {
      const matchesName = project.name
        .toLowerCase()
        .includes(projectNameFilter);
      const matchesCreatedBy = project.createdBy
        .toLowerCase()
        .includes(createdByFilter);
      const matchesStatus = project.status.toLowerCase().includes(statusFilter);

      // Parse dates for comparison
      const projectStartDate = new Date(project.startDate);

      // Check if the project falls within the date range
      const matchesDateRange =
        (!fromDate || projectStartDate >= fromDate) &&
        (!toDate || projectStartDate <= toDate);
      return (
        matchesName && matchesCreatedBy && matchesStatus && matchesDateRange
      );
    });

    // Paginate projects
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

    return {
      total: filteredProjects.length,
      page: page,
      limit: limit,
      data: paginatedProjects,
    };
  }
}

export const projectManager = new ProjectManager();