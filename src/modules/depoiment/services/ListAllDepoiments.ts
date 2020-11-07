import { injectable, inject } from 'tsyringe';

import IDepoimentsRepository from '../repositories/IDepoimentsRepository';
import Depoiment from '../infra/typeorm/entities/Depoiment';

@injectable()
class CreateUserService {
  constructor(
    @inject('DepoimentsRepository')
    private depoimentsRepository: IDepoimentsRepository,
  ) {}

  public async execute(): Promise<Depoiment[]> {
    const depoiments = await this.depoimentsRepository.listAll();

    return depoiments;
  }
}

export default CreateUserService;
