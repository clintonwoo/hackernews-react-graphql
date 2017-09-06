import convertNumberToTimeAgo from '../convertNumberToTimeAgo';

const ONE_YEAR = 3.154e+10;
const ONE_MONTH = 2.628e+9;
// don't care about weeks
const ONE_DAY = 8.64e+7;
const ONE_HOUR = 3.6e+6;
const ONE_MINUTE = 60000;

describe('convertNumberToTimeAgo helper function', () => {
  it('accepts negative numbers (date older than 1970)', () => {
    const now = new Date();
    const sixtyYearsAgo = new Date(now.valueOf() - (ONE_YEAR * 60));
    expect(sixtyYearsAgo.valueOf()).toBeLessThan(0);
    expect(convertNumberToTimeAgo(sixtyYearsAgo.valueOf())).toMatch('60 years ago');
  });
  it('outputs multiple years', () => {
    const now = new Date();
    const threeYearsAgo = new Date(now.valueOf() - (ONE_YEAR * 3));
    expect(convertNumberToTimeAgo(threeYearsAgo.valueOf())).toMatch('3 years ago');
  });
  it('outputs one year', () => {
    const now = new Date();
    const oneYearAgo = new Date(now.valueOf() - ONE_YEAR);
    expect(convertNumberToTimeAgo(oneYearAgo.valueOf())).toMatch('a year ago');
  });
  it('outputs multiple months', () => {
    const now = new Date();
    const threeMonthsAgo = new Date(now.valueOf() - (ONE_MONTH * 3));
    expect(convertNumberToTimeAgo(threeMonthsAgo.valueOf())).toMatch('3 months');
  });
  it('outputs one month', () => {
    const now = new Date();
    const oneMonthAgo = new Date(now.valueOf() - ONE_MONTH);
    expect(convertNumberToTimeAgo(oneMonthAgo.valueOf())).toMatch('1 month ago');
  });
  it('outputs multiple days', () => {
    const now = new Date();
    const threeDaysAgo = new Date(now.valueOf() - (ONE_DAY * 3));
    expect(convertNumberToTimeAgo(threeDaysAgo.valueOf())).toMatch('3 days ago');
  });
  it('outputs one day', () => {
    const now = new Date();
    const oneDayAgo = new Date(now.valueOf() - ONE_DAY);
    expect(convertNumberToTimeAgo(oneDayAgo.valueOf())).toMatch('1 day ago');
  });
  it('outputs multiple hours', () => {
    const now = new Date();
    const threeHoursAgo = new Date(now.valueOf() - (ONE_HOUR * 3));
    expect(convertNumberToTimeAgo(threeHoursAgo.valueOf())).toMatch('3 hours ago');
  });
  it('outputs one hour', () => {
    const now = new Date();
    const oneHourAgo = new Date(now.valueOf() - ONE_HOUR);
    expect(convertNumberToTimeAgo(oneHourAgo.valueOf())).toMatch('1 hour ago');
  });
  it('outputs multiple minutes', () => {
    const now = new Date();
    const threeMinutesAgo = new Date(now.valueOf() - (ONE_MINUTE * 3));
    expect(convertNumberToTimeAgo(threeMinutesAgo.valueOf())).toMatch('3 minutes ago');
  });
  it('outputs one minute', () => {
    const now = new Date();
    const oneMinuteAgo = new Date(now.valueOf() - ONE_MINUTE);
    expect(convertNumberToTimeAgo(oneMinuteAgo.valueOf())).toMatch('1 minute ago');
  });
  it('throws an error for date in the future', () => {
    
  });
});
