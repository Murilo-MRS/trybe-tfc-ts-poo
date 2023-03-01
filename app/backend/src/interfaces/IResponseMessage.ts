export default interface IResponseMessage<T> {
  status: number;
  message: T;
}
