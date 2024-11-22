"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.number = void 0;
var utils_1 = require("../utils");
/** Create a number schema. */
function number() {
    return utils_1.createSymmetricSchema({
        type: 'number',
        validate: utils_1.toValidator(utils_1.isNumericString),
        map: utils_1.coerceNumericStringToNumber,
    });
}
exports.number = number;
