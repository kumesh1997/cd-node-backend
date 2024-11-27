export interface PaginatedRequest {
    page: number;
    limit: number;
    projectName? : string,
    status? : string,
    createdBy? : string,
    dateFrom? : string,
    dateTo? : string
  }