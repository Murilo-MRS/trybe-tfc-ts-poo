export default interface IResponse<T> {
  status: number;
  message: T;
}
