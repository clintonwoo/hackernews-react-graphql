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
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationError = (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(err) {
        var _this = _super.call(this, err.message) || this;
        _this.code = err.code;
        Error.captureStackTrace(_this, ValidationError);
        return _this;
    }
    return ValidationError;
}(Error));
exports.ValidationError = ValidationError;
//# sourceMappingURL=ValidationError.js.map