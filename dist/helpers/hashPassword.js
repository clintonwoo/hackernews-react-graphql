"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
exports.createHash = function (password, salt, iterations) {
    return new Promise(function (resolve, reject) {
        var saltBuffer = typeof salt === 'string' ? Buffer.from(salt, 'base64') : salt;
        var callback = function (err, derivedKey) { return (err ? reject(err) : resolve(derivedKey.toString('base64'))); };
        crypto.pbkdf2(password, saltBuffer, iterations, 512 / 8, 'sha512', callback);
    });
};
exports.createSalt = function () { return crypto.randomBytes(128).toString('base64'); };
//# sourceMappingURL=hashPassword.js.map