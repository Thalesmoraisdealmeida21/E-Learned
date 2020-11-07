import { injectable, inject } from 'tsyringe';
import Depoiment from '../infra/typeorm/entities/Depoiment';

import IDepoimentsRepository from '../repositories/IDepoimentsRepository';

interface IRequest {
  person: string;
  depoiment: string;
}

@injectable()
class CreateDepoimentService {
  constructor(
    @inject('DepoimentsRepository')
    private depoimentsRepository: IDepoimentsRepository,
  ) {}

  public async execute({ person, depoiment }: IRequest): Promise<Depoiment> {
    const depoimentCreated = await this.depoimentsRepository.create({
      depoiments: depoiment,
      person,
    });

    return depoimentCreated;
  }
}

export default CreateDepoimentService;
