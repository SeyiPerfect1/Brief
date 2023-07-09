// import request from "supertest";
// import app from "../../server"; // Assuming your Express app is exported from app.ts
// import { URLModel, URLDoc } from "../../src/models/URL.models";
// import { UserModel, UserDoc } from "../../src/models/User.models";
// import {
//   getValuesFromRedis,
//   setValuesInRedis,
// } from "../../src/config/redisConfig";
// import { clickDetails } from "../../src/utility/clickDetails";

// describe("inputURL", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should create a short URL and return the QR code download link", async () => {
//     const originalURL = "https://www.example.com";
//     const customDomain = "example.com";
//     const shortCode = "mockShortCode";
//     const qrCodeDownloadLink = "mockQRCodeDownloadLink";

//     const mockURL =
//       //: URLDoc & {
//       //save: jest.MockedFunction<typeof URLDoc.prototype.save>;
//       //}
//       {
//         originalURL,
//         shortCode,
//         customDomain,
//         qrCodeImage: qrCodeDownloadLink,
//         save: jest.fn(),
//       };

//     (URLModel.create as jest.Mock).mockResolvedValueOnce(mockURL);
//     (UserModel.findOne as jest.Mock).mockResolvedValueOnce({
//       URLs: [],
//       save: jest.fn(),
//     });

//     const response = await request(app)
//       .post("/api/input-url")
//       .send({ originalURL, customDomain });

//     expect(response.status).toBe(201);
//     expect(response.body.shortURL).toBe(`https://${customDomain}/${shortCode}`);
//     expect(response.body.qrCodeDownloadLink).toBe(qrCodeDownloadLink);
//     expect(URLModel.create).toHaveBeenCalledTimes(1);
//     expect(URLModel.create).toHaveBeenCalledWith({
//       originalURL,
//       shortCode,
//       customDomain,
//       qrCodeImage: qrCodeDownloadLink,
//     });
//     expect(UserModel.findOne).toHaveBeenCalledTimes(1);
//     expect(UserModel.findOne).toHaveBeenCalledWith({ _id: expect.anything() });
//     expect(mockURL.save).toHaveBeenCalledTimes(1);
//   });

//   // Cleanup after tests if necessary
//   afterAll(() => {
//     jest.restoreAllMocks(); // Restore the original implementation of URLModel and UserModel
//   });
// });

// describe("getOriginalURL", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should redirect to the original URL if it exists in the cache", async () => {
//     const shortCode = "mockShortCode";
//     const originalURL = "https://www.example.com";
//     const userAgent = "mockUserAgent";
//     const ipAddress = "mockIpAddress";

//     const mockCachedURL = {
//       originalURL,
//     };

//     (getValuesFromRedis as jest.Mock).mockResolvedValueOnce(mockCachedURL);
//     (clickDetails as jest.Mock).mockResolvedValueOnce({});

//     const response = await request(app).get(`/api/url/${shortCode}`);

//     expect(response.status).toBe(302);
//     expect(response.header["location"]).toBe(originalURL);
//     expect(getValuesFromRedis).toHaveBeenCalledTimes(1);
//     expect(getValuesFromRedis).toHaveBeenCalledWith(shortCode);
//     expect(clickDetails).toHaveBeenCalledTimes(1);
//     expect(clickDetails).toHaveBeenCalledWith(ipAddress, userAgent, shortCode);
//   });

//   it("should redirect to the original URL if it exists in the database", async () => {
//     const shortCode = "mockShortCode";
//     const originalURL = "https://www.example.com";
//     const userAgent = "mockUserAgent";
//     const ipAddress = "mockIpAddress";

//     const mockURL = {
//       originalURL,
//       qrCodeImage: "mockQRCodeImage",
//       shortCode,
//     };

//     (getValuesFromRedis as jest.Mock).mockResolvedValueOnce({});
//     (URLModel.findOne as jest.Mock).mockResolvedValueOnce(mockURL);
//     (setValuesInRedis as jest.Mock).mockResolvedValueOnce({});

//     const response = await request(app).get(`/api/url/${shortCode}`);

//     expect(response.status).toBe(302);
//     expect(response.header["location"]).toBe(originalURL);
//     expect(getValuesFromRedis).toHaveBeenCalledTimes(1);
//     expect(getValuesFromRedis).toHaveBeenCalledWith(shortCode);
//     expect(URLModel.findOne).toHaveBeenCalledTimes(1);
//     expect(URLModel.findOne).toHaveBeenCalledWith({ shortCode });
//     expect(setValuesInRedis).toHaveBeenCalledTimes(1);
//     expect(setValuesInRedis).toHaveBeenCalledWith(shortCode, {
//       originalURL,
//       qrCodeImage: mockURL.qrCodeImage,
//     });
//   });

//   // Cleanup after tests if necessary
//   afterAll(() => {
//     jest.restoreAllMocks(); // Restore the original implementation of getValuesFromRedis, URLModel, and setValuesInRedis
//   });
// });

// describe("getURLAnalytics", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should return the analytics data for the specified URL", async () => {
//     const shortCode = "mockShortCode";
//     const clicks = [
//       {
//         userAgent: "PostmanRuntime/7.32.3",
//         country: "Nigeria",
//         region: "Lagos",
//         city: "Lagos",
//         latitude: null,
//         longitude: "null",
//         zipCode: "386r39",
//         timeZone: "Lagos",
//         timestamp: "2023-07-03T04:36:20.675+00:00",
//       },
//     ];

//     const mockURL = {
//       shortCode,
//       clicks,
//     };

//     (URLModel.findOne as jest.Mock).mockResolvedValueOnce(mockURL);

//     const response = await request(app).get(`/api/url/${shortCode}/analytics`);

//     expect(response.status).toBe(200);
//     expect(response.body.clicks).toBe(clicks);
//     expect(URLModel.findOne).toHaveBeenCalledTimes(1);
//     expect(URLModel.findOne).toHaveBeenCalledWith({ shortCode });
//   });

//   it("should return 404 if the URL is not found", async () => {
//     const shortCode = "nonExistentShortCode";

//     (URLModel.findOne as jest.Mock).mockResolvedValueOnce(null);

//     const response = await request(app).get(`/api/url/${shortCode}/analytics`);

//     expect(response.status).toBe(404);
//     expect(response.body.msg).toBe("URL not found");
//     expect(URLModel.findOne).toHaveBeenCalledTimes(1);
//     expect(URLModel.findOne).toHaveBeenCalledWith({ shortCode });
//   });

//   // Cleanup after tests if necessary
//   afterAll(() => {
//     jest.restoreAllMocks(); // Restore the original implementation of URLModel
//   });
// });

// describe("getUserURLHistory", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should return the URL history for the user", async () => {
//     const userId = "mockUserId";
//     const userURLs = [
//       {
//         shortCode: "shortCode1",
//         originalURL: "https://example1.com",
//         qrCodeImage: "qrCodeImage1",
//       },
//       {
//         shortCode: "shortCode2",
//         originalURL: "https://example2.com",
//         qrCodeImage: "qrCodeImage2",
//       },
//     ];

//     const mockUser = {
//       _id: userId,
//       URLs: userURLs.map((url) => url.shortCode),
//     };

//     (UserModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);
//     (UserModel.populate as jest.Mock).mockResolvedValueOnce(mockUser);

//     (URLModel.find as jest.Mock).mockResolvedValueOnce(userURLs);

//     const response = await request(app).get("/api/user/url-history");

//     expect(response.status).toBe(200);
//     expect(response.body.history).toEqual(userURLs);
//     expect(UserModel.findOne).toHaveBeenCalledTimes(1);
//     expect(UserModel.findOne).toHaveBeenCalledWith({ _id: userId });
//     expect(UserModel.populate).toHaveBeenCalledTimes(1);
//     expect(UserModel.populate).toHaveBeenCalledWith(mockUser, "URLs");
//     expect(URLModel.find).toHaveBeenCalledTimes(1);
//     expect(URLModel.find).toHaveBeenCalledWith({
//       _id: { $in: userURLs.map((url) => url.shortCode) },
//     });
//   });

//   it("should return 404 if the user has no URL history", async () => {
//     const userId = "mockUserId";

//     const mockUser = {
//       _id: userId,
//       URLs: [],
//     };

//     (UserModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

//     const response = await request(app).get("/api/user/url-history");

//     expect(response.status).toBe(404);
//     expect(response.body.msg).toBe("user has no URL history");
//     expect(UserModel.findOne).toHaveBeenCalledTimes(1);
//     expect(UserModel.findOne).toHaveBeenCalledWith({ _id: userId });
//     expect(UserModel.populate).not.toHaveBeenCalled();
//     expect(URLModel.find).not.toHaveBeenCalled();
//   });

//   // Cleanup after tests if necessary
//   afterAll(() => {
//     jest.restoreAllMocks(); // Restore the original implementation of UserModel and URLModel
//   });
// });
