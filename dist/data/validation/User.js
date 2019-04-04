"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationError_1 = require("./ValidationError");
function isValidUser(_a) {
    var id = _a.id;
    if (id.length < 3 || id.length > 32)
        throw new ValidationError_1.ValidationError({ code: 'id', message: 'User ID must be between 3 and 32 characters.' });
    return true;
}
exports.isValidUser = isValidUser;
function isValidNewUser(_a) {
    var id = _a.id, password = _a.password;
    if (id.length < 3 || id.length > 32)
        throw new ValidationError_1.ValidationError({ code: 'id', message: 'User ID must be between 3 and 32 characters.' });
    if (password.length < 8 || password.length > 100)
        throw new ValidationError_1.ValidationError({ code: 'pw', message: 'User password must be longer than 8 characters.' });
    return true;
}
exports.isValidNewUser = isValidNewUser;
//# sourceMappingURL=User.js.map