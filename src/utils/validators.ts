export const isNonEmpty = (value: string): boolean => value.trim() !== "";

export const isValidEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const isLengthValid = (value: string, min: number = 6, max?: number): boolean => {
  const length = value.trim().length;
  return max ? length >= min && length <= max : length >= min;
};

export const isNumeric = (value: string): boolean => /^[0-9]+$/.test(value.trim());

export const isAlphabetic = (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim());

export const isAlphanumeric = (value: string): boolean => /^[a-zA-Z0-9\s]+$/.test(value.trim());

export const isValidPhoneNumber = (value: string): boolean => /^\+?\d{7,15}$/.test(value.trim()); // internacional o nacional

export const isValidDocumentNumber = (value: string): boolean => /^\d{6,15}$/.test(value.trim());

export const isStrongPassword = (value: string): boolean =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,;:#_-])[A-Za-z\d@$!%*?&.,;:#_-]{8,}$/.test(value.trim());

export const doPasswordsMatch = (password: string, confirmPassword: string): boolean => password === confirmPassword;

export const matchesRegex = (value: string, regex: RegExp): boolean => regex.test(value.trim());

export const isValidDate = (date: string): boolean => !isNaN(Date.parse(date));

export const getTrimmedValue = (value: string): string => value.trim();
