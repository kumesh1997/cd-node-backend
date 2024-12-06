import { projectRepository } from "../repository/project.repository";
import { PaginatedRequest } from "../types/requests/paginatedProject.request";
import { ResponseData } from "../types/responses/api-response.interface";
import { PaginatedResponse } from "../types/responses/paginatedProject.response";
import { ProjectResponseDto } from "../types/responses/projects/projectResponseDto";

class ProjectManager {
  async getPaginatedProjects(
    request: PaginatedRequest
  ): Promise<ResponseData<ProjectResponseDto[]>> {
    
    const allProjects = projectRepository.getAllProjects();
    const totalCount = (await allProjects).length;
    const page = request.page || null;
    const limit = request.limit || null;
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
    let paginatedProjects = filteredProjects;
    if(page && limit)
    {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      paginatedProjects = filteredProjects.slice(startIndex, endIndex);
    }
   

    if (paginatedProjects.length == 0) {
      const responseData: ResponseData<ProjectResponseDto[]> = {
        success: false,
        message: "NO_DATE_FOUND",
        totalCount: 0,
        data: [],
      };
      return responseData;
    }

    const responseData: ResponseData<ProjectResponseDto[]> = {
      success: true,
      message: "DATA_FOUND",
      totalCount: totalCount,
      data: paginatedProjects,
    };

    return responseData;
  }
}

export const projectManager = new ProjectManager();
