// interface CustomErrorInterface {
//   status: number;
//   message: string;
// }

// class CustomError extends Error implements CustomErrorInterface {
//   status;
//   constructor(status: number, message: string) {
//     super(message);
//     this.status = status;
//   }
// }

function dispatchError(status: number) {
  switch (status) {
    case 401:
      throw new Error("Unauthorized");
    case 422:
      throw new Error("有効なデータではないです。");
    default:
      throw new Error("UnknownError");
  }
}

export { dispatchError };
