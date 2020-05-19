import { EntityRepository, Repository, getRepository, Raw } from 'typeorm';

import {
  ICreateAppointmentDTO,
  IFindAllMonthFromProviderDTO,
} from '@modules/appointments/dtos';
import { IAppointmentRepository } from '@modules/appointments/repositories';
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';

@EntityRepository(Appointment)
export class AppointmentRepository implements IAppointmentRepository {
  private orm: Repository<Appointment>;

  constructor() {
    this.orm = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.orm.findOne({
      where: {
        date,
      },
    });

    return findAppointment;
  }

  public async findAllMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.orm.find({
      where: {
        provider_id,
        date: Raw(
          field => `to_char(${field}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });
    return appointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.orm.create({ provider_id, date });
    this.orm.save(appointment);

    return appointment;
  }
}

export default AppointmentRepository;
