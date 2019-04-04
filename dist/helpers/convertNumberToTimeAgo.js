"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertNumberToTimeAgo = function (number) {
    var now = +new Date();
    var timeAgo = now - number;
    var ONE_YEAR = 3.154e10;
    var ONE_MONTH = 2.628e9;
    var ONE_DAY = 8.64e7;
    var ONE_HOUR = 3.6e6;
    var ONE_MINUTE = 60000;
    switch (true) {
        case timeAgo >= ONE_YEAR * 2:
            return Math.floor(timeAgo / ONE_YEAR) + " years ago";
        case timeAgo >= ONE_YEAR:
            return 'a year ago';
        case timeAgo >= ONE_MONTH * 2:
            return Math.floor(timeAgo / ONE_MONTH) + " months ago";
        case timeAgo >= ONE_MONTH:
            return '1 month ago';
        case timeAgo >= ONE_DAY * 2:
            return Math.floor(timeAgo / ONE_DAY) + " days ago";
        case timeAgo >= ONE_DAY:
            return '1 day ago';
        case timeAgo >= ONE_HOUR * 2:
            return Math.floor(timeAgo / ONE_HOUR) + " hours ago";
        case timeAgo >= ONE_HOUR:
            return '1 hour ago';
        case timeAgo >= ONE_MINUTE * 2:
            return Math.floor(timeAgo / ONE_MINUTE) + " minutes ago";
        case timeAgo >= 0:
            return '1 minute ago';
        default:
            throw new Error("convertNumberToTimeAgo: number " + number + " timeAgo " + timeAgo + ", is date older than 1970 or in the future?");
    }
};
//# sourceMappingURL=convertNumberToTimeAgo.js.map