import request from "supertest";
import app from "../app"; // replace with the path to your Express app
import Movie from "../models/movie";

jest.mock("../models/movie"); // this line mocks the Movie model

describe("Movie controller", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create a new movie", async () => {
    const mockMovie = {
      title: "Test Movie",
      publishingYear: 2022,
      imageUrl: "http://test.com",
    };
    (Movie.create as jest.Mock).mockResolvedValue(mockMovie);

    const res = await request(app)
      .post("/movies") // replace with your actual endpoint
      .send(mockMovie);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockMovie);
  });

  // Add similar tests for getAll, getById, updateOne, deleteOne
});
