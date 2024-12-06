import { Request, Response } from "express";
import { projectController } from "../../src/controllers/project.controller";
import { projectManager } from "../../src/managers/project.manager";

jest.mock("../../src/managers/project.manager");

describe("create", () => {
  const req: Partial<Request> = {
    query: {
      page: "1",
      limit: "10",
      projectName: "test",
      status: "active",
      createdBy: "user1",
      dateFrom: "2023-01-01",
      dateTo: "2023-12-31",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

//   it("should return paginated projects", async () => {
//     const paginatedProjects = [
//       { id: 1, name: "Project 1" },
//       { id: 2, name: "Project 2" },
//     ];
//     (projectManager.getPaginatedProjects as jest.Mock).mockResolvedValue(
//       paginatedProjects
//     );
//     await getPaginatedProjects(req as Request, res as Response, next);
//     expect(projectManager.getPaginatedProjects).toHaveBeenCalledWith({
//       page: 1,
//       limit: 10,
//       projectName: "test",
//       status: "active",
//       createdBy: "user1",
//       dateFrom: "2023-01-01",
//       dateTo: "2023-12-31",
//     });
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.send).toHaveBeenCalledWith(paginatedProjects);
//   });
});
