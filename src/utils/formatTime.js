import { format, formatDistance, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy', { locale: es });
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm', { locale: es });
}

export function fTime(date) {
  return format(new Date(date), 'HH:mm', { locale: es });
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p', { locale: es });
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), { 
    addSuffix: true,
    locale: es,
  });
}

export function fDateDistance(pastDate, futureDate) {
  return formatDistance(new Date(pastDate), new Date(futureDate), { locale: es })
}
