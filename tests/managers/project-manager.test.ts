import { projectManager } from "../../src/managers/project.manager";
import { projectRepository } from "../../src/repository/project.repository";
import { ResponseData } from "../../src/types/responses/api-response.interface";
import { ProjectResponseDto } from "../../src/types/responses/projects/projectResponseDto";
import { PaginatedRequest } from "../../src/types/requests/paginatedProject.request";

jest.mock("../../src/repository/project.repository");

describe("getPaginatedProjects", () => {
 
    const allProjects = [
        {
          projectId: 1,
          name: "Project 1",
          createdBy: "User 6",
          createdDate: "2023-01-28",
          startDate: "2023-02-23",
          endDate: "2023-04-27",
          status: "Delayed",
        },
        {
          projectId: 2,
          name: "MPS",
          createdBy: "User 7",
          createdDate: "2023-06-20",
          startDate: "2023-07-16",
          endDate: "2023-09-24",
          status: "Delayed",
        },
        {
          projectId: 3,
          name: "Project 3",
          createdBy: "User 1",
          createdDate: "2023-12-09",
          startDate: "2023-12-14",
          endDate: "2024-05-31",
          status: "Not Started",
        },
        {
          projectId: 4,
          name: "Project 4",
          createdBy: "User 1",
          createdDate: "2023-02-08",
          startDate: "2023-02-22",
          endDate: "2023-08-10",
          status: "Not Started",
        },
        {
          projectId: 5,
          name: "Project 5",
          createdBy: "User 7",
          createdDate: "2023-11-25",
          startDate: "2023-12-19",
          endDate: "2024-05-10",
          status: "Delayed",
        },
        {
          projectId: 6,
          name: "Project 6",
          createdBy: "User 6",
          createdDate: "2023-12-14",
          startDate: "2023-12-21",
          endDate: "2024-04-07",
          status: "Completed",
        },
        {
          projectId: 7,
          name: "Project 7",
          createdBy: "User 4",
          createdDate: "2023-07-19",
          startDate: "2023-08-13",
          endDate: "2023-12-01",
          status: "In Progress",
        },
        {
          projectId: 8,
          name: "Project 8",
          createdBy: "User 4",
          createdDate: "2023-05-04",
          startDate: "2023-05-23",
          endDate: "2023-08-23",
          status: "Completed",
        },
      ];
      
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should return paginated projects", async () => {
    const mockRequest: PaginatedRequest = {
        page: 1,
        limit: 5,
        projectName: "mps",
        status: "",
        createdBy: "",
        dateFrom: "",
        dateTo: "",
      };

    (projectRepository.getAllProjects as jest.Mock).mockResolvedValue(
      allProjects
    );

    const expectedResponse: ResponseData<ProjectResponseDto[]> = {
      success: true,
      message: "DATA_FOUND",
      data: allProjects.slice(0, 5),
    };
    const result = await projectManager.getPaginatedProjects(mockRequest);
    expect(result.success).toEqual(true);
    expect(result.data.length).toEqual(1);
  });

  it("should return no data found", async () => {
    const mockRequest: PaginatedRequest = {
        page: 0,
        limit: 0,
        projectName: "no_project",
        status: "",
        createdBy: "",
        dateFrom: "",
        dateTo: "",
      };

    (projectRepository.getAllProjects as jest.Mock).mockResolvedValue([]);
    const expectedResponse: ResponseData<ProjectResponseDto[]> = {
      success: false,
      message: "NO_DATA_FOUND",
      data: [],
    };
    const result = await projectManager.getPaginatedProjects(mockRequest);
    expect(result.success).toEqual(false);
    expect(result.data).toEqual([]);
  });
});
