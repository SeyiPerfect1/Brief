"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginInputSchema = exports.UserRegisterInputSchema = void 0;
var zod_1 = require("zod");
exports.UserRegisterInputSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        firstName: (0, zod_1.string)({
            required_error: 'First Name is required',
        }),
        lastName: (0, zod_1.string)({
            required_error: 'Last Name is required',
        }),
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }).email('Not a valid email address'),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        }).min(6, 'Password too short - should be 6 chars minimum'),
    }),
});
exports.userLoginInputSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }).email('Not a valid email address'),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        }).min(6, 'Password too short - should be atleast 8 characters'),
    }),
});
