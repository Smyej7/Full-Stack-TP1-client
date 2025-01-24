export interface ApiError {
    status: number;
    message: string;
    timestamp: number;
    validationErrors?: { [key: string]: string };
  }
  