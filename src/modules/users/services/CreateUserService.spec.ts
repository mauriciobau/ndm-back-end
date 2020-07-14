import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Juca',
      email: 'juca@email.com',
      role: 'admin',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should note be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Juca',
      email: 'juca@email.com',
      role: 'admin',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Juca',
        email: 'juca@email.com',
        role: 'admin',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should note be able to create a new user with a not permited role', async () => {
    await expect(
      createUser.execute({
        name: 'Juca',
        email: 'juca@email.com',
        role: 'not-permited-role',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
