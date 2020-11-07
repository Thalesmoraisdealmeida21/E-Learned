import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IDepoimentsRepository from '../repositories/IDepoimentsRepository';
import Depoiment from '../infra/typeorm/entities/Depoiment';

interface IRequest {
  id: string;
  person: string;
  depoiment: string;
}

@injectable()
class UpdateDepoimentsService {
  constructor(
    @inject('DepoimentsRepository')
    private depoimentsRepository: IDepoimentsRepository,
  ) {}

  public async execute({
    id,
    person,
    depoiment,
  }: IRequest): Promise<Depoiment> {
    const depoimentFound = await this.depoimentsRepository.findOne(id);

    if (!depoimentFound) {
      throw new AppError('Depoiment not found');
    }

    depoimentFound.person = person;
    depoimentFound.depoiment = depoiment;

    await this.depoimentsRepository.save(depoimentFound);

    return depoimentFound;
  }
}

export default UpdateDepoimentsService;
