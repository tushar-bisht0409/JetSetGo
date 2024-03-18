export function formatDate(dateString: string): string {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    const dateParts = dateString.split('-');
    const year = dateParts[0];
    const monthIndex = parseInt(dateParts[1]) - 1;
    const day = dateParts[2];
  
    const month = months[monthIndex];
  
    return `${parseInt(day)} ${month}, ${year}`;
  }
  
  
export function formatTime(input: string): string {
  const hours = input.split(' ')[0];
  const minutesStr = input.split(' ')[2];
  const minutes = minutesStr === undefined ? undefined : minutesStr.replace(/\D/g, '');

  if (hours && minutes) {
      return `${hours}h ${minutes}m`;
  } else if (hours) {
      return `${hours}h`;
  } else if (minutes) {
      return `${minutes}m`;
  } else {
      return '';
  }
  }
  
  export function formatDurationInMinutes (duration: string): number {

    const hours = duration.split(' ')[0];
  const minutesStr = duration.split(' ')[2];
  const minutes = minutesStr === undefined ? undefined : minutesStr.replace(/\D/g, '');
  let totalMinutes = 0;

  if (hours && minutes) {
    totalMinutes = (parseInt(hours)*60) + parseInt(minutes);
  } else if (hours) {
    totalMinutes = (parseInt(hours)*60);
  } else if (minutes) {
    totalMinutes = parseInt(minutes);
  } else {
       totalMinutes = 0;
  }

    return totalMinutes;
};