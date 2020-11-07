import { getRepository, Repository } from 'typeorm';
import ICreateDepoimentDTO from '@modules/depoiment/dtos/ICreateDepoimentDTO';
import Depoiment from '../entities/Depoiment';
import IDepoimentsRepository from '../../../repositories/IDepoimentsRepository';

class DepoimentsRepository implements IDepoimentsRepository {
  private ormRepository: Repository<Depoiment>;

  constructor() {
    this.ormRepository = getRepository(Depoiment);
  }

  public async create(depoimentData: ICreateDepoimentDTO): Promise<Depoiment> {
    const depoiment = this.ormRepository.create({
      depoiment: depoimentData.depoiments,
      person: depoimentData.person,
    });

    await this.ormRepository.save(depoiment);

    return depoiment;
  }

  public async listAll(): Promise<Depoiment[]> {
    const depoiments = await this.ormRepository.find();

    return depoiments;
  }

  public async delete(depoimentID: string): Promise<void> {
    await this.ormRepository.delete(depoimentID);
  }

  public async findOne(depoimentID: string): Promise<Depoiment | undefined> {
    const depoiment = await this.ormRepository.findOne(depoimentID);
    return depoiment;
  }

  public async save(depoiment: Depoiment): Promise<void> {
    await this.ormRepository.save(depoiment);
  }
}

export default DepoimentsRepository;
