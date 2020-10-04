import { format, parseISO } from 'date-fns';

export const formatDate = s => {
  const date = parseISO(s);
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  const UTCDate = new Date(date.getTime() + timezoneOffset);

  return format(UTCDate, 'dd/MM/yyyy');
};
