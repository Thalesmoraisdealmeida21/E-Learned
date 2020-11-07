import { injectable, inject } from 'tsyringe';

import IDepoimentsRepository from '../repositories/IDepoimentsRepository';

interface IRequest {
  idDepoiment: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('DepoimentsRepository')
    private depoimentsRepository: IDepoimentsRepository,
  ) {}

  public async execute({ idDepoiment }: IRequest): Promise<void> {
    await this.depoimentsRepository.delete(idDepoiment);
  }
}

export default CreateUserService;
