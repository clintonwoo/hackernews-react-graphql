"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var UserLoginErrorCode = {
    INCORRECT_PASSWORD: 'pw',
    INVALID_ID: 'invalid_id',
    LOGGED_IN: 'loggedin',
    LOGIN_UNSUCCESSFUL: 'unsuccessful',
    LOGIN_UPVOTE: 'up',
    USERNAME_TAKEN: 'id',
};
UserLoginErrorCode.messages = (_a = {},
    _a[UserLoginErrorCode.INCORRECT_PASSWORD] = 'Incorrect password.',
    _a[UserLoginErrorCode.INVALID_ID] = 'User ID must be between 3 and 32 characters.',
    _a[UserLoginErrorCode.LOGGED_IN] = 'Logged in user must logout before logging in again.',
    _a[UserLoginErrorCode.LOGIN_UNSUCCESSFUL] = 'Login unsuccessful.',
    _a[UserLoginErrorCode.LOGIN_UPVOTE] = 'You have to be logged in to vote.',
    _a[UserLoginErrorCode.USERNAME_TAKEN] = 'Username is taken.',
    _a);
exports.default = UserLoginErrorCode;
//# sourceMappingURL=UserLoginErrorCode.js.map