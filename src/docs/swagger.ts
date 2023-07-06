import CONFIG from "../config/environment";
import {
  createURL,
  createURLBody,
  getUserURLHistory,
  redirectUsingShortLink,
  getURLAnalytics,
} from "./URL.docs";
import {
  createUser,
  createUserBody,
  forgotPasswordUser,
  resetpasswordUser,
  loginUser,
  resendVerifyUserMail,
  updateUser,
  verifyUserMail,
} from "./User.docs";

//options object for swaggerjs
export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nene",
      version: "1.0.0",
      description: "An api for NeNe",
    },
    paths: {
      // for authentication/users
      "/auth/register": {
        post: createUser,
      },
      "/auth/confirm/{confirmationCode}": {
        get: verifyUserMail,
      },
      "/auth/resend-confirm": {
        post: resendVerifyUserMail,
      },
      "/auth/login": {
        post: loginUser,
      },
      "/auth/update": {
        put: updateUser,
      },
      "/auth/forgot-password": {
        post: forgotPasswordUser,
      },
      "/auth/reset-password/{id}/{token}": {
        post: resetpasswordUser,
      },

      // for UrLs
      "/shortner": {
        post: createURL,
      },
      "/shortner/history": {
        get: getUserURLHistory,
      },
      "/shortner/{shortCode}": {
        get: redirectUsingShortLink,
      },
      "/shortner/{shortCode}/analytics": {
        get: getURLAnalytics,
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        createUserBody,
        createURLBody
      },
    },
    servers: [
      {
        //update to production url
        url: `${CONFIG.BASE_URL}/api/`,
      },
    ],
    tags: [
      {
        name: "Auth",
      },
      {
        name: "Shortner",
      },
    ],
  },
  apis: ["../routes/index.ts"],
};
