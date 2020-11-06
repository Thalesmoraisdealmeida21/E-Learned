// import ICreateUserDTO from '../dtos/ICreateorderDTO';

export default interface IOrderRepository {
  delete(course: string): Promise<void>;
}
