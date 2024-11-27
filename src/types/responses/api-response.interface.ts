export interface ResponseData<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResult<R> {
  entities: R[];
  pagination: Pagination;
}

export interface Pagination {
  length: number;
  pageSize: number;
}
