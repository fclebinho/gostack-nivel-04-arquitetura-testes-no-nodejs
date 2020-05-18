import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/providers';

import {
  IUsersRepository,
  IUserTokensRepository,
} from '@modules/users/repositories';

import {
  UsersRepository,
  UserTokensRepository,
} from '@modules/users/infra/typeorm/repositories';

import { IAppointmentRepository } from '@modules/appointments/repositories';
import { AppointmentRepository } from '@modules/appointments/infra/typeorm/repositories/appointment-repository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);
