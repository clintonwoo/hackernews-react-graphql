"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var DB = require("../Database");
var HNDB = require("../HNDataAPI");
var Cache_1 = require("../Cache");
var hashPassword_1 = require("../../helpers/hashPassword");
var config_1 = require("../../config");
var User_1 = require("../validation/User");
var User = (function () {
    function User(props) {
        if (!props.id)
            throw new Error("Error instantiating User, id invalid: " + props.id);
        User_1.isValidUser(props);
        this.id = props.id;
        this.about = props.about || '';
        this.creationTime = props.creationTime || +new Date();
        this.dateOfBirth = props.dateOfBirth || null;
        this.email = props.email || null;
        this.firstName = props.firstName || null;
        this.hides = props.hides || [];
        this.karma = props.karma || 1;
        this.lastName = props.lastName || null;
        this.likes = props.likes || [];
        this.posts = props.posts || [];
        this.hashedPassword = props.hashedPassword || undefined;
        this.passwordSalt = props.passwordSalt || undefined;
    }
    User.getUser = function (id) { return Cache_1.cache.getUser(id) || HNDB.fetchUser(id); };
    User.getPostsForUser = function (id) { return DB.getNewsItems().filter(function (newsItem) { return newsItem.submitterId === id; }); };
    User.validPassword = function (id, password) { return __awaiter(_this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = Cache_1.cache.getUser(id);
                    if (!user) return [3, 2];
                    return [4, hashPassword_1.createHash(password, user.passwordSalt, config_1.passwordIterations)];
                case 1: return [2, (_a.sent()) === user.hashedPassword];
                case 2: return [2, false];
            }
        });
    }); };
    User.registerUser = function (user) { return __awaiter(_this, void 0, void 0, function () {
        var passwordSalt, hashedPassword, newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    User_1.isValidNewUser(user);
                    if (Cache_1.cache.getUser(user.id))
                        throw new Error('Username is taken.');
                    passwordSalt = hashPassword_1.createSalt();
                    return [4, hashPassword_1.createHash(user.password, passwordSalt, config_1.passwordIterations)];
                case 1:
                    hashedPassword = _a.sent();
                    newUser = new User({
                        id: user.id,
                        hashedPassword: hashedPassword,
                        passwordSalt: passwordSalt,
                    });
                    Cache_1.cache.setUser(user.id, newUser);
                    return [2, newUser];
            }
        });
    }); };
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map