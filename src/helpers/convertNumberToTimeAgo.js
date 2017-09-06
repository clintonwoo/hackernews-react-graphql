export default (number) => {
  const date = new Date(number);
  const now = new Date();
  const timeAgo = now.valueOf() - date.valueOf();

  const ONE_YEAR = 3.154e+10;
  const ONE_MONTH = 2.628e+9;
  // don't care about weeks
  const ONE_DAY = 8.64e+7;
  const ONE_HOUR = 3.6e+6;
  const ONE_MINUTE = 60000;

  switch (true) {
    case timeAgo >= (ONE_YEAR * 2):
      return `${Math.floor(timeAgo / ONE_YEAR)} years ago`;
    case timeAgo >= ONE_YEAR:
      return 'a year ago';
    case timeAgo >= (ONE_MONTH * 2):
      return `${Math.floor(timeAgo / ONE_MONTH)} months ago`;
    case timeAgo >= ONE_MONTH:
      return '1 month ago';
    case timeAgo >= (ONE_DAY * 2):
      return `${Math.floor(timeAgo / ONE_DAY)} days ago`;
    case timeAgo >= ONE_DAY:
      return '1 day ago';
    case timeAgo >= (ONE_HOUR * 2):
      return `${Math.floor(timeAgo / ONE_HOUR)} hours ago`;
    case timeAgo >= ONE_HOUR:
      return '1 hour ago';
    case timeAgo >= (ONE_MINUTE * 2):
      return `${Math.floor(timeAgo / ONE_MINUTE)} minutes ago`;
    case timeAgo >= 0:
      return '1 minute ago';
    default:
      // timeAgo < 0 is in the future
      throw new Error(`convertNumberToTimeAgo: number ${number} timeAgo ${timeAgo}, is date older than 1970 or in the future?`);
  }
};
