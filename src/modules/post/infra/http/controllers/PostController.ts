import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePostService from '@modules/post/services/CreatePostService';
import ListPostService from '@modules/post/services/ListAllPosts';
import GetOnePost from '@modules/post/services/GetOnePostService';
import UpdatePostService from '@modules/post/services/UpdatePostService';
import UploadPostImage from '@modules/post/services/UploadPostImageService';

import DeletePostService from '@modules/post/services/DeletePostService';

export default class PostController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createPost = container.resolve(CreatePostService);

    const {
      name,
      description,
      resume,
      facebookLink,
      category,
      image,
    } = request.body;

    const post = await createPost.execute({
      name,
      description,
      resume,
      facebookLink,
      category,
      image,
    });

    return response.json(post);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listPost = container.resolve(ListPostService);

    const posts = await listPost.execute();

    return response.json(posts);
  }

  public async findOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const getOne = container.resolve(GetOnePost);

    const { id } = request.params;

    const post = await getOne.execute(id);

    return response.json(post);
  }

  public async uploadImage(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const uploadImage = container.resolve(UploadPostImage);

    const fileName = request.file.filename;

    const imageUrl = await uploadImage.execute({ postImageFileName: fileName });

    return response.json({ image: imageUrl });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deletePost = container.resolve(DeletePostService);
    const { id } = request.params;

    await deletePost.execute(id);

    return response.json({});
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updatePost = container.resolve(UpdatePostService);
    const { id } = request.params;
    const { name, description, resume, facebookLink, category } = request.body;

    const postUpdated = await updatePost.execute({
      id,
      name,
      description,
      resume,
      facebookLink,
      category,
    });

    return response.json(postUpdated);
  }
}
