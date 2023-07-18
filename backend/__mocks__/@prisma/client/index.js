module.exports = {
  PrismaClient: jest.fn().mockImplementation(() => {
    return {
      user: {
        findUnique: jest.fn().mockResolvedValueOnce(null),
      },
      tag: {
        findMany: jest
          .fn()
          .mockResolvedValueOnce([{ name: "tag1" }, { name: "tag2" }])
          .mockRejectedValueOnce(new Error("DB error")),
      },
    };
  }),
};
