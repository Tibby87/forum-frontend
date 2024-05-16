export interface RestResponse<T> {
  status: number;
  message: string;
  data: T;
}
