import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  role: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    email,
    role,
    password,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Endereço de e-mail já está sendo utilizado.');
    }

    const permitedRoles = ['admin', 'suport'];

    const isRolePemited = permitedRoles.find(
      rolePermited => rolePermited === role,
    );

    if (!isRolePemited) {
      throw new AppError('Função não permitida.');
    }

    const hashdPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      role,
      password: hashdPassword,
    });

    await this.cacheProvider.invalidatePrefix('users-list');

    return user;
  }
}

export default CreateUserService;
