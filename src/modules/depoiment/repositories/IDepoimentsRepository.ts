import ICreateDepoimentDTO from '../dtos/ICreateDepoimentDTO';
import Depoiment from '../infra/typeorm/entities/Depoiment';

export default interface IDepoimentsRepository {
  create(depoiment: ICreateDepoimentDTO): Promise<Depoiment>;
  listAll(): Promise<Depoiment[]>;
  delete(idDepoiment: string): Promise<void>;
  save(depoiment: Depoiment): Promise<void>;
  findOne(idDepoiment: string): Promise<Depoiment | undefined>;
}
