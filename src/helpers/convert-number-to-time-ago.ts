/**
 * Converts a number to text to show how long ago it was
 * eg. 2 years ago. 3 months ago. 16 minutes ago.
 */
export const convertNumberToTimeAgo = (number: number): string => {
  const now = +new Date();
  const timeAgo = now - number;

  const ONE_YEAR = 3.154e10;
  const ONE_MONTH = 2.628e9;
  // don't care about weeks
  const ONE_DAY = 8.64e7;
  const ONE_HOUR = 3.6e6;
  const ONE_MINUTE = 60000;

  if (timeAgo >= ONE_YEAR * 2) {
    return `${Math.floor(timeAgo / ONE_YEAR)} years ago`;
  } else if (timeAgo >= ONE_YEAR) {
    return 'a year ago';
  } else if (timeAgo >= ONE_MONTH * 2) {
    return `${Math.floor(timeAgo / ONE_MONTH)} months ago`;
  } else if (timeAgo >= ONE_MONTH) {
    return '1 month ago';
  } else if (timeAgo >= ONE_DAY * 2) {
    return `${Math.floor(timeAgo / ONE_DAY)} days ago`;
  } else if (timeAgo >= ONE_DAY) {
    return '1 day ago';
  } else if (timeAgo >= ONE_HOUR * 2) {
    return `${Math.floor(timeAgo / ONE_HOUR)} hours ago`;
  } else if (timeAgo >= ONE_HOUR) {
    return '1 hour ago';
  } else if (timeAgo >= ONE_MINUTE * 2) {
    return `${Math.floor(timeAgo / ONE_MINUTE)} minutes ago`;
  } else if (timeAgo >= 0) {
    return '1 minute ago';
  } else  {
    // timeAgo < 0 is in the future
    console.error(`convertNumberToTimeAgo: number ${number} timeAgo ${timeAgo}, is date older than 1970 or in the future?`)
    return '';
  }
};
