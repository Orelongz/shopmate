export const isLoading = (type, status) => ({
  type,
  status
});

export const successfulRequest = (type, credentials) => ({
  type,
  credentials
});

export const failedRequest = (type, error) => ({
  type,
  error
});
