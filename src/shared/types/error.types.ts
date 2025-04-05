export type ErrorResponseType = {
  status: number;
  data: {
    status: string;
    error: {
      code: string;
      message: string;
    };
  };
};
