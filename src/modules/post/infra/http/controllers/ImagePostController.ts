import { Request, Response } from 'express';
import { container } from 'tsyringe';
import RemoveImagePost from '@modules/post/services/RemoveImagePost';


export default class PostController {


    public async delete(request: Request, response: Response): Promise<Response> {

        const removeImagePost = container.resolve(RemoveImagePost);


        const {id} = request.params

        await removeImagePost.execute(id);

        return response.status(204).json();

    }
}
