export function APIResponse<T>(error: boolean, message: string, data: T) {
  return {
    error,
    message,
    data,
  };
}
