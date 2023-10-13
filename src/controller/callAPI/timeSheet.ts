const HOST = process.env.HOST;

const callApiOption: Record<string, string> = {
  thisMonth: `${HOST}/api/user/search-timesheet/this-month`,
  lastMonth: `${HOST}/api/user/search-timesheet/last-month`,
  byDate: `${HOST}/api/user/search-timesheet/find-by-date`,
};

const getTimeSheetByDate = (start_time: Date, end_time: Date) => {};
