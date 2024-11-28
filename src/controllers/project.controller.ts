import { Request, Response } from "express";
import { projectManager } from "../managers/project.manager";
class ProjectController {
  public getPaginatedProjects = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { page, limit, projectName, status, createdBy, dateFrom, dateTo } =
        req.query;
      const paginatedProjects = await projectManager.getPaginatedProjects({
        page: Number(page),
        limit: Number(limit),
        projectName: projectName?.toString(),
        status: status?.toString(),
        createdBy: createdBy?.toString(),
        dateFrom: dateFrom?.toString(),
        dateTo: dateTo?.toString(),
      });
      res.status(200).send(paginatedProjects);
    } catch (error: any) {
      res.status(500).send(error);
    }
  };
}

export const projectController = new ProjectController();
