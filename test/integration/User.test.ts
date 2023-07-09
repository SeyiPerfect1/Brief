// import request from "supertest";
// import app from "../../src/utility/ExpressApp";
// import { UserModel, UserDoc } from "../../src/models/User.models";
// import { signToken } from "../../src/utility/Jwt";
// import bcrypt from "bcryptjs";
// import jwt from 'jsonwebtoken';
// import randomstring from "randomstring";
// import axios from "axios";
// import { jest } from '@jest/globals';

// jest.mock("../../src/models/User.models"); // Mocking the UserModel

// describe("RegisterUser", () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); // Clear all mocks before each test
//   });

//   it("should register a new user and send confirmation email", async () => {
//     const userData = {
//       firstName: "John",
//       lastName: "Doe",
//       password: "password123",
//       email: "john@example.com",
//     };

//     const mockUser = {
//       ...userData,
//       confirmationCode: "abc123",
//     };

//     // (UserModel.create as jest.Mock).mockResolvedValueOnce(mockUser);
//     (UserModel.create as jest.MockedFunction<typeof UserModel.create>).mockResolvedValueOnce(mockUser as never);



//     const response = await request(app)
//       .post("/api/auth/register")
//       .send(userData);

//     expect(response.status).toBe(201);
//     expect(response.body.msg).toBe(
//       "User created successfully! Please check your mail"
//     );
//     expect(UserModel.create).toHaveBeenCalledTimes(1);
//     expect(UserModel.create).toHaveBeenCalledWith(userData);
//   });

//   it("should return an error if the user already exists", async () => {
//     const existingUser = {
//       firstName: "Jane",
//       lastName: "Doe",
//       password: "password123",
//       email: "jane@example.com",
//     };

//     (UserModel.findOne as jest.Mock).mockResolvedValueOnce(existingUser as never);

//     const response = await request(app)
//       .post("/api/auth/register")
//       .send(existingUser);

//     expect(response.status).toBe(400);
//     expect(response.body.msg).toBe("User already exists");
//     expect(UserModel.findOne).toHaveBeenCalledTimes(1);
//     expect(UserModel.findOne).toHaveBeenCalledWith({
//       email: existingUser.email,
//     });
//   });

//   // Cleanup after tests if necessary
//   afterAll(() => {
//     jest.restoreAllMocks(); // Restore the original implementation of UserModel
//   });
// });

// describe("verifyUser", () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); // Clear all mocks before each test
//   });

//   it("should verify the user and update the status", async () => {
//     const confirmationCode = "abc123";

//     const mockUser =
//       //: UserDoc & {
//       // save: jest.MockedFunction<typeof UserDoc.prototype.save>;
//       {
//         firstName: "John",
//         lastName: "Doe",
//         password: "password123",
//         email: "john@example.com",
//         confirmationCode,
//         status: "Pending",
//         // save: jest.fn(),
//       };

//     (UserModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser as never);

//     const response = await request(app).get(
//       `/api/auth/verify/${confirmationCode}`
//     );

//     expect(response.status).toBe(200);
//     expect(response.body.msg).toBe("Verification Successful.You can now login");
//     expect(UserModel.findOne).toHaveBeenCalledTimes(1);
//     expect(UserModel.findOne).toHaveBeenCalledWith({ confirmationCode });
//     //   expect(mockUser.save).toHaveBeenCalledTimes(1);
//     expect(mockUser.status).toBe("Active");
//     expect(mockUser.confirmationCode).toBe("");
//   });

//   it("should return an error for invalid confirmation code", async () => {
//     const invalidConfirmationCode = "invalid123";

//     (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null as never);

//     const response = await request(app).get(
//       `/api/auth/verify/${invalidConfirmationCode}`
//     );

//     expect(response.status).toBe(400);
//     expect(response.body.msg).toBe("Invalid Verification Code");
//     expect(UserModel.findOne).toHaveBeenCalledTimes(1);
//     expect(UserModel.findOne).toHaveBeenCalledWith({
//       confirmationCode: invalidConfirmationCode,
//     });
//   });

//   // Cleanup after tests if necessary
//   afterAll(() => {
//     jest.restoreAllMocks(); // Restore the original implementation of UserModel
//   });
// });

// // describe("resendUserVerificationLink", () => {
// //   beforeEach(() => {
// //     jest.clearAllMocks(); // Clear all mocks before each test
// //   });

// //   it("should resend the verification link", async () => {
// //     const email = "john@example.com";

// //     const mockUser =
// //       //: UserDoc & {
// //       //     confirmationCode: string;
// //       //     // save: jest.MockedFunction<typeof UserDoc.prototype.save>;
// //       {
// //         firstName: "John",
// //         lastName: "Doe",
// //         password: "password123",
// //         email,
// //         confirmationCode: "abc123",
// //         status: "Pending",
// //         save: jest.fn(),
// //       };

// //     (UserModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

// //     const response = await request(app)
// //       .post("/api/auth/resend-verification-link")
// //       .send({ email });

// //     expect(response.status).toBe(200);
// //     expect(response.body.msg).toBe(
// //       "Verification link sent, kindly check your mail"
// //     );
// //     expect(UserModel.findOne).toHaveBeenCalledTimes(1);
// //     expect(UserModel.findOne).toHaveBeenCalledWith({
// //       email: email.toLowerCase(),
// //     });
// //     expect(mockUser.save).toHaveBeenCalledTimes(1);
// //   });

// //   it("should return an error for non-existent user", async () => {
// //     const nonExistentEmail = "nonexistent@example.com";

// //     (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);

// //     const response = await request(app)
// //       .post("/api/auth/resend-verification-link")
// //       .send({ email: nonExistentEmail });

// //     expect(response.status).toBe(400);
// //     expect(response.body.msg).toBe("User does not exist");
// //     expect(UserModel.findOne).toHaveBeenCalledTimes(1);
// //     expect(UserModel.findOne).toHaveBeenCalledWith({
// //       email: nonExistentEmail.toLowerCase(),
// //     });
// //   });

// //   // Cleanup after tests if necessary
// //   afterAll(() => {
// //     jest.restoreAllMocks(); // Restore the original implementation of UserModel
// //   });
// // });

// // describe("userLogin", () => {
// //   beforeEach(() => {
// //     jest.clearAllMocks(); // Clear all mocks before each test
// //   });

// //   it("should log in the user and return a token", async () => {
// //     const email = "john@example.com";
// //     const password = "password123";

// //     const mockUser =
// //       //   : UserDoc & {
// //       // password: string;
// //       // status: string;
// //       //}
// //       {
// //         firstName: "John",
// //         lastName: "Doe",
// //         password: await bcrypt.hash(password, 12),
// //         email,
// //         confirmationCode: "",
// //         status: "Active",
// //         save: jest.fn(),
// //       };

// //     (UserModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

// //     const response = await request(app)
// //       .post("/api/auth/login")
// //       .send({ email, password });

// //     expect(response.status).toBe(200);
// //     expect(response.body.message).toBe("User login successfully");
// //     expect(response.body.firstname).toBe(mockUser.firstName);
// //     expect(response.body.lastname).toBe(mockUser.lastName);
// //     expect(response.body.email).toBe(mockUser.email);
// //     expect(response.body.token).toBeDefined();
// //     expect(UserModel.findOne).toHaveBeenCalledTimes(1);
// //     expect(UserModel.findOne).toHaveBeenCalledWith({ email });
// //   });

// //   it("should return an error for invalid credentials", async () => {
// //     const email = "john@example.com";
// //     const password = "incorrectPassword";

// //     const mockUser =
// //       //: UserDoc & {
// //       //password: string;
// //       //}
// //       {
// //         firstName: "John",
// //         lastName: "Doe",
// //         password: await bcrypt.hash("password123", 12),
// //         email,
// //         confirmationCode: "",
// //         status: "Active",
// //         save: jest.fn(),
// //       };

// //     (UserModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

// //     const response = await request(app)
// //       .post("/api/auth/login")
// //       .send({ email, password });

// //     expect(response.status).toBe(401);
// //     expect(response.body.message).toBe(
// //       "Unable to login, Invalid email or password"
// //     );
// //     expect(UserModel.findOne).toHaveBeenCalledTimes(1);
// //     expect(UserModel.findOne).toHaveBeenCalledWith({ email });
// //   });

// //   // Cleanup after tests if necessary
// //   afterAll(() => {
// //     jest.restoreAllMocks(); // Restore the original implementation of UserModel
// //   });
// // });

// // describe("googleAuth", () => {
// //   beforeEach(() => {
// //     jest.clearAllMocks(); // Clear all mocks before each test
// //   });

// //   it("should log in the user with Google credentials", async () => {
// //     const token = "googleAccessToken";

// //     const mockGoogleData = {
// //       email: "john@example.com",
// //       name: "John Doe",
// //       phone: "1234567890",
// //       picture: "https://example.com/avatar.jpg",
// //     };

// //     const mockUser =
// //       //: UserDoc & {
// //       //   email: string;
// //       //   password: string;
// //       //   status: string;
// //       //}
// //       {
// //         firstName: "John",
// //         lastName: "Doe",
// //         email: mockGoogleData.email,
// //         password: "password123",
// //         status: "Active",
// //         save: jest.fn(),
// //       };

// //     (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockGoogleData });
// //     (UserModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);
// //     (signToken as jest.Mock).mockResolvedValueOnce("mockToken");

// //     const response = await request(app)
// //       .post("/api/auth/google")
// //       .send({ token });

// //     expect(response.status).toBe(200);
// //     expect(response.body.message).toBe("Login successfully");
// //     expect(response.body.userData.user).toBe(mockUser);
// //     expect(response.body.userData.token).toBe("mockToken");
// //     expect(axios.get).toHaveBeenCalledTimes(1);
// //     expect(axios.get).toHaveBeenCalledWith(
// //       `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
// //     );
// //     expect(UserModel.findOne).toHaveBeenCalledTimes(1);
// //     expect(UserModel.findOne).toHaveBeenCalledWith({
// //       email: mockGoogleData.email,
// //     });
// //     expect(signToken).toHaveBeenCalledTimes(1);
// //   });

// //   it("should create a new user with Google credentials", async () => {
// //     const token = "googleAccessToken";

// //     const mockGoogleData = {
// //       email: "john@example.com",
// //       name: "John Doe",
// //       phone: "1234567890",
// //       picture: "https://example.com/avatar.jpg",
// //     };

// //     const mockUser =
// //       //: UserDoc & {
// //       //   email: string;
// //       //   password: string;
// //       //   status: string;
// //       //}
// //       {
// //         firstName: "John",
// //         lastName: "Doe",
// //         email: mockGoogleData.email,
// //         password: "password123",
// //         status: "Active",
// //         save: jest.fn(),
// //       };

// //     (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockGoogleData });
// //     (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);
// //     (UserModel.create as jest.Mock).mockResolvedValueOnce(mockUser);
// //     (signToken as jest.Mock).mockResolvedValueOnce("mockToken");

// //     const response = await request(app)
// //       .post("/api/auth/google")
// //       .send({ token });

// //     expect(response.status).toBe(201);
// //     expect(response.body.message).toBe("Account created, kindly proceed");
// //     expect(response.body.userData.user).toBe(mockUser);
// //     expect(response.body.userData.token).toBe("mockToken");
// //     expect(axios.get).toHaveBeenCalledTimes(1);
// //     expect(axios.get).toHaveBeenCalledWith(
// //       `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
// //     );
// //     expect(UserModel.findOne).toHaveBeenCalledTimes(1);
// //     expect(UserModel.findOne).toHaveBeenCalledWith({
// //       email: mockGoogleData.email,
// //     });
// //     expect(UserModel.create).toHaveBeenCalledTimes(1);
// //     expect(UserModel.create).toHaveBeenCalledWith({
// //       email: mockGoogleData.email,
// //       full_name: mockGoogleData.name,
// //       phone: mockGoogleData.phone,
// //       avartar: mockGoogleData.picture,
// //       status: "Active",
// //       password: expect.any(String),
// //     });
// //     expect(signToken).toHaveBeenCalledTimes(1);
// //   });

// //   // Cleanup after tests if necessary
// //   afterAll(() => {
// //     jest.restoreAllMocks(); // Restore the original implementation of axios, UserModel, and signToken
// //   });
// // });

// // describe("updateUserProfile", () => {
// //   beforeEach(() => {
// //     jest.clearAllMocks(); // Clear all mocks before each test
// //   });

// //   it("should update the user profile", async () => {
// //     const userId = "mockUserId";
// //     const mockUser =
// //       //: UserDoc2
// //       {
// //         _id: userId,
// //         firstName: "John",
// //         lastName: "Doe",
// //         image: "https://example.com/avatar.jpg",
// //         save: jest.fn(),
// //       };

// //     (UserModel.findById as jest.Mock).mockResolvedValueOnce(mockUser);

// //     const updatedFirstName = "John Updated";
// //     const updatedLastName = "Doe Updated";
// //     const updatedImage = "https://example.com/avatar-updated.jpg";

// //     const response = await request(app)
// //       .put("/api/profile")
// //       .set("Authorization", "Bearer mockToken")
// //       .send({
// //         firstName: updatedFirstName,
// //         lastName: updatedLastName,
// //         image: updatedImage,
// //       });

// //     expect(response.status).toBe(200);
// //     expect(response.body.msg).toBe("Profile updated successfully");
// //     expect(response.body.updatedBuyer).toEqual({
// //       _id: userId,
// //       firstName: updatedFirstName,
// //       lastName: updatedLastName,
// //       image: updatedImage,
// //       save: expect.any(Function),
// //     });
// //     expect(UserModel.findById).toHaveBeenCalledTimes(1);
// //     expect(UserModel.findById).toHaveBeenCalledWith(userId);
// //     expect(mockUser.firstName).toBe(updatedFirstName);
// //     expect(mockUser.lastName).toBe(updatedLastName);
// //     expect(mockUser.image).toBe(updatedImage);
// //     expect(mockUser.save).toHaveBeenCalledTimes(1);
// //   });

// //   it("should return 404 if the user is not found", async () => {
// //     (UserModel.findById as jest.Mock).mockResolvedValueOnce(null);

// //     const response = await request(app)
// //       .put("/api/profile")
// //       .set("Authorization", "Bearer mockToken")
// //       .send({
// //         firstName: "John Updated",
// //         lastName: "Doe Updated",
// //         image: "https://example.com/avatar-updated.jpg",
// //       });

// //     expect(response.status).toBe(404);
// //     expect(response.text).toBe("User not found");
// //     expect(UserModel.findById).toHaveBeenCalledTimes(1);
// //   });

// //   // Cleanup after tests if necessary
// //   afterAll(() => {
// //     jest.restoreAllMocks(); // Restore the original implementation of UserModel
// //   });
// // });

// // describe("forgotPassword", () => {
// //   beforeEach(() => {
// //     jest.clearAllMocks(); // Clear all mocks before each test
// //   });

// //   it("should send a reset password email to the user", async () => {
// //     const email = "test@example.com";

// //     const mockUser = {
// //       _id: "mockUserId",
// //       firstName: "John",
// //       lastName: "Doe",
// //       email,
// //       password: "mockPassword",
// //     };

// //     (UserModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

// //     const response = await request(app)
// //       .post("/api/auth/forgot-password")
// //       .send({ email });

// //     expect(response.status).toBe(200);
// //     expect(response.body.message).toBe(
// //       "Reset Password Link Sent successfully! Please check your mail"
// //     );
// //     expect(response.body.reset_link).toMatch(
// //       /\/api\/auth\/reset-password\/mockUserId\/\w+/
// //     );
// //     expect(UserModel.findOne).toHaveBeenCalledTimes(1);
// //     expect(UserModel.findOne).toHaveBeenCalledWith({ email });
// //   });

// //   it("should return an error if no user with the email is found", async () => {
// //     const email = "nonexistent@example.com";

// //     (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);

// //     const response = await request(app)
// //       .post("/api/auth/forgot-password")
// //       .send({ email });

// //     expect(response.status).toBe(400);
// //     expect(response.body.message).toBe("No User With This Email");
// //     expect(UserModel.findOne).toHaveBeenCalledTimes(1);
// //     expect(UserModel.findOne).toHaveBeenCalledWith({ email });
// //   });

// //   // Cleanup after tests if necessary
// //   afterAll(() => {
// //     jest.restoreAllMocks(); // Restore the original implementation of UserModel
// //   });
// // });

// // describe('resetPassword', () => {
// //     beforeEach(() => {
// //       jest.clearAllMocks();
// //     });
  
// //     it('should reset the user password', async () => {
// //       const userId = 'mockUserId';
// //       const token = 'mockToken';
// //       const password = 'newPassword';
// //       const confirmPassword = 'newPassword';
  
// //       const mockUser = {
// //         _id: userId,
// //         password: 'oldPassword',
// //         save: jest.fn(),
// //       };
  
// //       (UserModel.findById as jest.Mock).mockResolvedValueOnce(mockUser);
// //       jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
// //         // Verify function implementation
// //         return { email: 'test@example.com', id: userId } as jwt.JwtPayload;
// //       });
  
// //       const response = await request(app)
// //         .post(`/api/auth/reset-password/${userId}/${token}`)
// //         .send({ password, confirmPassword });
  
// //     expect(response.status).toBe(200);
// //     expect(response.body.message).toBe("Password Reset Successfully!");
// //     expect(UserModel.findById).toHaveBeenCalledTimes(1);
// //     expect(UserModel.findById).toHaveBeenCalledWith(userId);
// //     expect(jwt.verify).toHaveBeenCalledTimes(1);
// //     expect(jwt.verify).toHaveBeenCalledWith(token, expect.any(String));
// //     expect(bcrypt.hash).toHaveBeenCalledTimes(1);
// //     expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
// //     expect(mockUser.save).toHaveBeenCalledTimes(1);
// //   });

// //   it("should return an error if no user with the given id is found", async () => {
// //     const userId = "nonexistentUserId";
// //     const token = "mockToken";
// //     const password = "newPassword";
// //     const confirmPassword = "newPassword";

// //     (UserModel.findById as jest.Mock).mockResolvedValueOnce(null);

// //     const response = await request(app)
// //       .post(`/api/auth/reset-password/${userId}/${token}`)
// //       .send({ password, confirmPassword });

// //     expect(response.status).toBe(400);
// //     expect(response.body.message).toBe("No User With This Id");
// //     expect(UserModel.findById).toHaveBeenCalledTimes(1);
// //     expect(UserModel.findById).toHaveBeenCalledWith(userId);
// //   });

// //   it("should return an error if the passwords do not match", async () => {
// //     const userId = "mockUserId";
// //     const token = "mockToken";
// //     const password = "newPassword";
// //     const confirmPassword = "differentPassword";

// //     const mockUser = {
// //       _id: userId,
// //     };

// //     (UserModel.findById as jest.Mock).mockResolvedValueOnce(mockUser);

// //     const response = await request(app)
// //       .post(`/api/auth/reset-password/${userId}/${token}`)
// //       .send({ password, confirmPassword });

// //     expect(response.status).toBe(400);
// //     expect(response.body.message).toBe("Passwords Do Not Match");
// //     expect(UserModel.findById).toHaveBeenCalledTimes(1);
// //     expect(UserModel.findById).toHaveBeenCalledWith(userId);
// //     // You can add more assertions here to verify the response and mock calls
// //   });

// //   // Cleanup after tests if necessary
// //   afterAll(() => {
// //     jest.restoreAllMocks(); // Restore the original implementation of UserModel, jwt, and bcrypt
// //   });
// // });
