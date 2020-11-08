import { injectable, inject } from 'tsyringe';

import IDepoimentsRepository from '../repositories/IDepoimentsRepository';
import Depoiment from '../infra/typeorm/entities/Depoiment';

@injectable()
class ListAllDepoimentsService {
  constructor(
    @inject('DepoimentsRepository')
    private depoimentsRepository: IDepoimentsRepository,
  ) {}

  public async execute(idDepoiment: string): Promise<Depoiment | undefined> {
    const depoiment = await this.depoimentsRepository.findOne(idDepoiment);

    return depoiment;
  }
}

export default ListAllDepoimentsService;
