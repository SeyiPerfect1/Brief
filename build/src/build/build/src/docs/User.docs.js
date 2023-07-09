"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetpasswordUser = exports.forgotPasswordUser = exports.updateUser = exports.loginUser = exports.resendVerifyUserMail = exports.verifyUserMail = exports.createUserBody = exports.createUser = void 0;
var createUser = {
    tags: ["Auth"],
    description: "Create a new user in the system",
    operationId: "createUser",
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/createUserBody",
                },
            },
        },
        required: true,
    },
    responses: {
        "201": {
            description: "User created successfully!",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            msg: {
                                type: "string",
                                example: "User created successfully! Please check your mail",
                            },
                        },
                    },
                },
            },
        },
        "400": {
            description: "User already exists",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            msg: {
                                type: "string",
                                example: "User already exists",
                            },
                        },
                    },
                },
            },
        },
        "500": {
            description: "Internal Server Error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            msg: {
                                type: "string",
                                example: "Something went wrong! Please try again",
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.createUser = createUser;
var verifyUserMail = {
    tags: ["Auth"],
    description: "Verify a new user's email",
    operationId: "verifyUserMail",
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: "confirmationCode",
            in: "path",
            description: "confirmation code of the user that is to be verified",
            required: true,
            schema: {
                type: "string",
            },
        },
    ],
    responses: {
        "200": {
            description: "Veification successful",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            msg: {
                                type: "string",
                                example: "Verification Successful.You can now login",
                            },
                        },
                    },
                },
            },
        },
        "400": {
            description: "Invalid verification code",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            msg: {
                                type: "string",
                                example: "Invalid verification code",
                            },
                        },
                    },
                },
            },
        },
        "500": {
            description: "Internal Server Error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            msg: {
                                type: "string",
                                example: "Something went wrong! Please try again",
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.verifyUserMail = verifyUserMail;
var resendVerifyUserMail = {
    tags: ["Auth"],
    description: "resend verify mail to user",
    operationId: "resendVerifyUserMail",
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        email: {
                            description: "Email of the user",
                            type: "string",
                            example: "johndoe@gmail.com",
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        "200": {
            description: "Veification link sent",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            msg: {
                                type: "string",
                                example: "Verification link sent, kindly check your mail",
                            },
                        },
                    },
                },
            },
        },
        "400": {
            description: "User does not exist",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            msg: {
                                type: "string",
                                example: "User does not exist",
                            },
                        },
                    },
                },
            },
        },
        "500": {
            description: "Internal Server Error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            msg: {
                                type: "string",
                                example: "Something went wrong! Please try again",
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.resendVerifyUserMail = resendVerifyUserMail;
var loginUser = {
    tags: ["Auth"],
    description: "Login a user using email and password",
    operationId: "loginUser",
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        email: {
                            description: "Email of the user",
                            type: "string",
                            example: "johndoe@gmail.com",
                        },
                        password: {
                            type: "string",
                            description: "unencrypted user's password",
                            example: "!1234aWe1Ro3$#",
                        },
                    },
                },
            },
            required: true,
        },
    },
    responses: {
        "200": {
            description: "Login successful",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "User login successfully",
                            },
                            id: {
                                type: "string",
                                example: "94ty-hfuw-ftr3-tu5t",
                            },
                            firstName: {
                                type: "string",
                                example: "John",
                            },
                            lastName: {
                                type: "string",
                                example: "snow",
                            },
                            email: {
                                type: "string",
                                example: "male",
                            },
                            token: {
                                type: "string",
                                example: "f42r4urh84u3395t53t53gng35jt93.fu3u4t40yhwwrfr2.fu349tu3udvwrf394uu",
                            },
                        },
                    },
                },
            },
        },
        "400": {
            description: "Email not yet verified",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "your email is yet to be verified",
                            },
                        },
                    },
                },
            },
        },
        "401": {
            description: "Invalid email or password",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "Unable to login, Invalid email or  password",
                            },
                        },
                    },
                },
            },
        },
        "500": {
            description: "Internal Server Error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            msg: {
                                type: "string",
                                example: "An Error Occured",
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.loginUser = loginUser;
var updateUser = {
    tags: ["Auth"],
    description: "Update user's details",
    operationId: "updateUser",
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        firstName: {
                            description: "firstname of the user",
                            type: "string",
                            example: "John",
                        },
                        lastName: {
                            type: "string",
                            description: "lastname of the user",
                            example: "Doe",
                        },
                    },
                },
            },
        },
        required: false,
    },
    responses: {
        "200": {
            description: "User details updated successfully!",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            msg: {
                                type: "string",
                                example: "Profile updated successfully",
                            },
                            updatedBuyer: {
                                type: "object",
                                firstName: {
                                    type: "string",
                                    example: "John",
                                },
                                lastName: {
                                    type: "string",
                                    example: "Doe",
                                },
                            },
                        },
                    },
                },
            },
        },
        "404": {
            description: "User not found",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            msg: {
                                type: "string",
                                example: "User not found",
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.updateUser = updateUser;
var forgotPasswordUser = {
    tags: ["Auth"],
    description: "Send password reset link to a user's email",
    operationId: "forgotPassword",
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        email: {
                            description: "Email of the user",
                            type: "string",
                            example: "johndoe@gmail.com",
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        "200": {
            description: "Veification link sent",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "Reset Password Link Sent successfully! Please check your mail",
                            },
                        },
                    },
                },
            },
        },
        "400": {
            description: "User does not exist",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "No User With This Email",
                            },
                        },
                    },
                },
            },
        },
        "500": {
            description: "Internal Server Error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "Error Sending Reset Password Email",
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.forgotPasswordUser = forgotPasswordUser;
var resetpasswordUser = {
    tags: ["Auth"],
    description: "Reset user Password By Using The Link Sent From Forgot Password Endpoint",
    operationId: "resetpassword",
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: "Id",
            in: "path",
            description: "This Id Is The user's ID",
            required: true,
            schema: {
                type: "string",
            },
        },
        {
            name: "Token",
            in: "path",
            description: "This Is The Token Sent To The user's Email",
            required: true,
            schema: {
                type: "string",
            },
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        password: {
                            description: "new unencrypted vendor password",
                            type: "string",
                            example: "!1234aWe1Ro3$#",
                        },
                        confirmpassword: {
                            description: "confirm unencrypted vendor password",
                            type: "string",
                            example: "!1234aWe1Ro3$#",
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        "200": {
            description: "Password Reset Successful",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "Password Reset Successfully!",
                            },
                        },
                    },
                },
            },
        },
        "400": {
            description: "User does not exist",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "No User With This Id",
                            },
                        },
                    },
                },
            },
        },
        "401": {
            description: "Passwords Do Not Match",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "Passwords Do Not Match!",
                            },
                        },
                    },
                },
            },
        },
        "500": {
            description: "Internal Server Error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "Error Reseting Password",
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.resetpasswordUser = resetpasswordUser;
var createUserBody = {
    type: "object",
    properties: {
        firstName: {
            type: "string",
            example: "John",
        },
        lastName: {
            type: "string",
            example: "Snow",
        },
        email: {
            type: "string",
            example: "johnsnow@email.com",
        },
        password: {
            type: "string",
            description: "unencrypted user's password, password must contain capital letter, small letter, a special character and must be at least 6 chars",
            example: "!1234aWe1Ro3$#",
        },
    },
};
exports.createUserBody = createUserBody;
