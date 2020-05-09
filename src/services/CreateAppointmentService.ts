import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepositiry from '../repositories/AppointmentsRepositiry';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepositiry = getCustomRepository(AppointmentsRepositiry);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepositiry.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is alredy booked');
    }

    const appointment = appointmentsRepositiry.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepositiry.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
