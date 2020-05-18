import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepositiry from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepositiry'

import Appointment from '../entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> implements IAppointmentsRepositiry {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment;
  }
}

export default AppointmentsRepository;
