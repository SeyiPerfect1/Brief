"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate = function (schema) {
    return function (req, res, next) {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (e) {
            console.log(e);
            return res.status(400).send(e.errors.message);
        }
    };
};
exports.default = validate;
