import { format, formatDistance, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy', { locale: es });
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export function fDateDistance(pastDate, futureDate) {
  return formatDistance(new Date(pastDate), new Date(futureDate), { locale: es })
}
