import moment from "moment/moment";

const filterFrom = (appointments, date) =>
  [...appointments].filter(
    (appointment) =>
      moment(appointment.date).format("YYYYMMDD") >=
      moment(date.dateFrom).format("YYYYMMDD")
  );
const filterTo = (appointments, date) =>
  [...appointments].filter(
    (appointment) =>
      moment(appointment.date).format("YYYYMMDD") <=
      moment(date.dateTo).format("YYYYMMDD")
  );
const filterFromTo = (appointments, date) =>
  [...appointments].filter(
    (appointment) =>
      moment(date.dateFrom).format("YYYYMMDD") <=
        moment(appointment.date).format("YYYYMMDD") &&
      moment(appointment.date).format("YYYYMMDD") <=
        moment(date.dateTo).format("YYYYMMDD")
  );

export { filterFrom, filterTo, filterFromTo };
