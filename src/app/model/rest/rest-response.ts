export interface RestResponse<T> {
  status: number;
  message: string;
  data: Array<T>;
}
