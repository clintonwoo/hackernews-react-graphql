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
var express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var nextApp = require("next");
var passport = require("passport");
var passport_local_1 = require("passport-local");
var bodyParser = require("body-parser");
var apollo_server_express_1 = require("apollo-server-express");
var Schema_1 = require("./data/Schema");
var HNDataAPI_1 = require("./data/HNDataAPI");
var Models_1 = require("./data/Models");
var config_1 = require("./config");
var delay = config_1.dev ? 0 : 0;
HNDataAPI_1.seedCache(delay);
var app = nextApp({ dir: config_1.appPath, dev: config_1.dev });
var handle = app.getRequestHandler();
app
    .prepare()
    .then(function () {
    var server = express();
    passport.use(new passport_local_1.Strategy({
        usernameField: 'id',
    }, function (username, password, done) { return __awaiter(_this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Models_1.User.getUser(username)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2, done(null, false, { message: 'Incorrect username.' })];
                    }
                    return [4, Models_1.User.validPassword(username, password)];
                case 2:
                    if (!(_a.sent())) {
                        return [2, done(null, false, { message: 'Incorrect password.' })];
                    }
                    return [2, done(null, user)];
            }
        });
    }); }));
    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });
    passport.deserializeUser(function (id, cb) { return __awaiter(_this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Models_1.User.getUser(id)];
                case 1:
                    user = _a.sent();
                    cb(null, user || null);
                    return [2];
            }
        });
    }); });
    server.use(cookieParser('mysecret'));
    server.use(session({
        secret: 'mysecret',
        resave: false,
        rolling: true,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    }));
    server.use(passport.initialize());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(passport.session());
    server.post('/login', function (req, res, next) {
        req.session.returnTo = req.body.goto;
        next();
    }, passport.authenticate('local', {
        successReturnToOrRedirect: '/',
        failureRedirect: '/login?how=unsuccessful',
    }));
    server.post('/register', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!req.user) return [3, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, Models_1.User.registerUser({
                            id: req.body.id,
                            password: req.body.password,
                        })];
                case 2:
                    _a.sent();
                    req.session.returnTo = "/user?id=" + req.body.id;
                    return [3, 4];
                case 3:
                    err_1 = _a.sent();
                    req.session.returnTo = "/login?how=" + err_1.code;
                    return [3, 4];
                case 4: return [3, 6];
                case 5:
                    req.session.returnTo = '/login?how=user';
                    _a.label = 6;
                case 6:
                    next();
                    return [2];
            }
        });
    }); }, passport.authenticate('local', {
        successReturnToOrRedirect: '/',
        failureRedirect: '/login?how=unsuccessful',
    }));
    server.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    var apolloServer = new apollo_server_express_1.ApolloServer({ schema: Schema_1.schema });
    apolloServer.applyMiddleware({ app: server });
    server.get('/news', function (req, res) {
        var actualPage = '/';
        app.render(req, res, actualPage);
    });
    server.get('*', function (req, res) { return handle(req, res); });
    server.listen(config_1.APP_PORT, function (err) {
        if (err)
            throw err;
        console.log("> App ready on " + config_1.APP_URI);
        console.log("> GraphQL Ready on " + config_1.GRAPHQL_URL);
        console.log("Dev: " + config_1.dev);
    });
})
    .catch(function (ex) {
    console.error(ex.stack);
    process.exit(1);
});
exports.default = app;
//# sourceMappingURL=server.js.map