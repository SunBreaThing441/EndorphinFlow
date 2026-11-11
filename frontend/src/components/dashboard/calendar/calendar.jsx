import axios from 'axios';
import randomColor from 'randomcolor';
import './calendar.css';

import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  AppointmentTooltip,
  ViewSwitcher,
  Toolbar,
  Resources,
  DateNavigator,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';

import {
  ViewState,
  IntegratedEditing,
  EditingState,
} from '@devexpress/dx-react-scheduler';

// import { appointments } from "./appointments";
import { useEffect, useState } from 'react';

export default function SchedulerExample() {
  const [appointmentData, setAppointmentData] = useState([]);
  const [practitioners, setPractitioners] = useState([]);

  useEffect(() => {
    axios.get('/api/appointments').then((res) => {
      console.log(res);
      const appData = res.data;
      const filteredAppointments = appData.map((appoint) => ({
        id: appoint.id,
        title: appoint.title,
        startDate: new Date(appoint.start_date),
        endDate: new Date(appoint.end_date),
      }));
      setAppointmentData(filteredAppointments);
    });

    axios.get(`/api/practitioners`).then((res) => {
      const pracData = res.data;

      const filteredPracs = pracData.map((person) => ({
        id: person.id,
        text: `${person.first_name} ${person.last_name}`,
        color: randomColor(),
      }));
      setPractitioners(filteredPracs);
    });
  }, []);

  const TimeTableCell = ({ onDoubleClick, ...restProps }) => {
    return <DayView.TimeTableCell onClick={onDoubleClick} {...restProps} />;
  };
  const resources = [
    {
      fieldName: 'ownerId',
      title: 'Select Practitioner',
      instances: practitioners,
    },
  ];

  const getAppointmentIndexById = (id) =>
    appointmentData.findIndex((appointment) => appointment.id == id);

  const commitChanges = ({ added, changed, deleted }) => {
    let data = appointmentData;

    if (added) {
      axios
        .post('/api/appointments/new', { appointment: added })
        .then(setAppointmentData((prev) => [...prev, added]));
    }
    if (changed) {
      // console.log('changed ==== ', changed)
      // console.log('changed object keys ==== ', Object.keys(changed))
      let appointmentId = Object.keys(changed)[0];
      const updateAppointment = changed[appointmentId];
      // console.log('updateAppointment', updateAppointment)
      appointmentId = parseInt(appointmentId);
      const appointmentIndex = getAppointmentIndexById(appointmentId);
      const appointment = {
        ...appointmentData[appointmentIndex],
        ...updateAppointment,
      };
      // console.log('appointment with changes===', appointment)

      axios.put(`/api/appointments/${appointmentId}`, { appointment }).then(
        (res) => {
          console.log('res data ======= ', res.data);
          console.log('appointmentindex =====+++', appointmentIndex);
          const newAppointments = [...appointmentData];
          newAppointments[appointmentIndex] = appointment;
          setAppointmentData(newAppointments);
        }

        // setAppointmentData(prev => [...prev, added])
      );

      console.log(' appointment id =====', appointmentId);

      data = data.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
    }
    if (deleted !== undefined) {
      axios
        .delete(`/api/appointments/${deleted}`)
        .then(
          setAppointmentData((prev) =>
            prev.filter((appointment) => appointment.id !== deleted)
          )
        )
        .catch((error) => console.log('delete error = ', error));

      // data = data.filter((appointment) => appointment.id !== deleted);
    }
    // setAppointmentData(prev => [...prev, data]);
  };

  return (
    <Scheduler className='scheduler' data={appointmentData}>
      <ViewState defaultCurrentDate={new Date()} />
      <DayView
        startDayHour={8}
        endDayHour={24}
        cellDuration={60}
        timeTableCellComponent={TimeTableCell}
      />

      <WeekView
        startDayHour={8}
        endDayHour={24}
        cellDuration={60}
        timeTableCellComponent={TimeTableCell}
      />

      <MonthView />

      <EditingState onCommitChanges={(e) => commitChanges(e)} />
      <IntegratedEditing />
      <Appointments />

      <Toolbar />
      <DateNavigator />

      <ViewSwitcher />
      <AppointmentTooltip showOpenButton showDeleteButton />
      <AppointmentForm />
    </Scheduler>
  );
}
