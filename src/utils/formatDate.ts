export const formatDate = (date: string) => {
  if (!date) return "-";

  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};


export const formatDateToLocalTime = (
  date: string | null,
  showTime: boolean = true
) => {
    if (!date) return "-";

    const baseOptions: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    const dateTimeOptions: Intl.DateTimeFormatOptions = showTime
      ? {
          ...baseOptions,
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }
      : baseOptions;

    return new Date(`${date}Z`).toLocaleString("en-IN", dateTimeOptions);
  };