export const ErrorMessages = {
  required: (field: string) => `${field} is required`,
  minLength: (field: string, len: number) => `${field} must be at least ${len} characters`,
  maxLength: (field: string, len: number) => `${field} must be at most ${len} characters`,
  alias: "Alias must only contain letters, numbers, hyphens, or underscores",
  url: "Invalid URL format",
  date: "Invalid date format",
};

export default ErrorMessages;