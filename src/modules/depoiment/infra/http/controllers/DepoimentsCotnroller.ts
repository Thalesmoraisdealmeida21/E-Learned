import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDepoimentService from '@modules/depoiment/services/CreateDepoimentService';
import DeleteDepoimentService from '@modules/depoiment/services/DeleteDepoimentService';
import UpdateDepoimentService from '@modules/depoiment/services/UpdateDepoimentService';

import ListAllDepoiments from '@modules/depoiment/services/ListAllDepoiments';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createDepoiment = container.resolve(CreateDepoimentService);

    const { person, depoiment } = request.body;

    const depoimentCreated = await createDepoiment.execute({
      depoiment,
      person,
    });

    return response.json(depoimentCreated);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteDepoiment = container.resolve(DeleteDepoimentService);

    const { depoimentId } = request.params;

    await deleteDepoiment.execute({ idDepoiment: depoimentId });

    return response.json();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listDepoiments = container.resolve(ListAllDepoiments);

    const depoimentsFound = await listDepoiments.execute();

    return response.json(depoimentsFound);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateDepoiment = container.resolve(UpdateDepoimentService);

    const { depoiment, person } = request.body;
    const { id } = request.params;

    const depoimentUpdated = await updateDepoiment.execute({
      id,
      depoiment,
      person,
    });

    return response.json(depoimentUpdated);
  }
}
