"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var cookie = require("cookie");
var debug_1 = require("debug");
var React = require("react");
var react_apollo_1 = require("react-apollo");
var initApollo_1 = require("./initApollo");
var logger = debug_1.debug('app:withData');
logger.log = console.log.bind(console);
function parseCookies(ctx, options) {
    if (ctx === void 0) { ctx = {}; }
    if (options === void 0) { options = {}; }
    var mycookie = cookie.parse(ctx.req && ctx.req.headers.cookie ? ctx.req.headers.cookie : '', options);
    logger('Parsing cookie: ', mycookie);
    return mycookie;
}
exports.withData = function (ComposedComponent) {
    var _a;
    return _a = (function (_super) {
            __extends(WithData, _super);
            function WithData(props) {
                var _this = _super.call(this, props) || this;
                _this.apollo = initApollo_1.initApollo(_this.props.serverState.apollo.data, {
                    getToken: function () { return parseCookies(); },
                });
                return _this;
            }
            WithData.getInitialProps = function (context) {
                return __awaiter(this, void 0, void 0, function () {
                    var serverState, apollo, composedInitialProps, url, app;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                serverState = { apollo: {} };
                                logger('getInitialProps with context: ', context);
                                apollo = initApollo_1.initApollo({}, {
                                    getToken: function () { return parseCookies(context); },
                                });
                                composedInitialProps = {};
                                if (!ComposedComponent.getInitialProps) return [3, 2];
                                return [4, ComposedComponent.getInitialProps(context, apollo)];
                            case 1:
                                composedInitialProps = _a.sent();
                                _a.label = 2;
                            case 2:
                                if (!!process.browser) return [3, 4];
                                if (context.res && context.res.finished) {
                                    return [2];
                                }
                                url = { query: context.query, pathname: context.pathname };
                                app = (React.createElement(react_apollo_1.ApolloProvider, { client: apollo },
                                    React.createElement(ComposedComponent, __assign({ url: url }, composedInitialProps))));
                                return [4, react_apollo_1.getDataFromTree(app)];
                            case 3:
                                _a.sent();
                                serverState = {
                                    apollo: {
                                        data: apollo.cache.extract(),
                                    },
                                };
                                _a.label = 4;
                            case 4: return [2, __assign({ serverState: serverState }, composedInitialProps)];
                        }
                    });
                });
            };
            WithData.prototype.render = function () {
                return (React.createElement(react_apollo_1.ApolloProvider, { client: this.apollo },
                    React.createElement(ComposedComponent, __assign({}, this.props))));
            };
            return WithData;
        }(React.Component)),
        _a.displayName = "WithData(" + ComposedComponent.displayName + ")",
        _a.propTypes = {
            serverState: PropTypes.object.isRequired,
        },
        _a;
};
//# sourceMappingURL=withData.js.map