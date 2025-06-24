import {
  isNonEmpty,
  isValidEmail,
  isLengthValid,
  isNumeric,
  isAlphabetic,
  isAlphanumeric,
  isValidPhoneNumber,
  isValidDocumentNumber,
  isStrongPassword,
  doPasswordsMatch,
} from "./validators";

export const validateEmail = (value: string): string => {
  if (!isNonEmpty(value)) return "El correo es obligatorio";
  if (!isValidEmail(value)) return "Correo no válido. Ejemplo: nombre@correo.com";
  return "";
};

export const validatePassword = (value: string): string => {
  if (!isNonEmpty(value)) return "La contraseña es obligatoria";
  if (!isLengthValid(value, 8)) return "Debe tener al menos 8 caracteres";
  if (!isStrongPassword(value)) return "Debe incluir mayúscula, minúscula, número y símbolo";
  return "";
};

export const validateConfirmPassword = (value: string, password: string): string => {
  if (!isNonEmpty(value)) return "Debes confirmar tu contraseña";
  if (!doPasswordsMatch(password, value)) return "Las contraseñas no coinciden";
  return "";
};

export const validateName = (value: string): string => {
  if (!isNonEmpty(value)) return "Este campo es obligatorio";
  if (!isAlphabetic(value)) return "Solo se permiten letras y espacios";
  return "";
};

export const validateAlphanumeric = (value: string): string => {
  if (!isNonEmpty(value)) return "Este campo es obligatorio";
  if (!isAlphanumeric(value)) return "Solo se permiten letras, números y espacios";
  return "";
};

export const validatePhone = (value: string): string => {
  if (!isNonEmpty(value)) return "El número de teléfono es obligatorio";
  if (!isValidPhoneNumber(value)) return "Número no válido. Ejemplo: +573001112233";
  return "";
};

export const validateDocument = (value: string): string => {
  if (!isNonEmpty(value)) return "El número de documento es obligatorio";
  if (!isValidDocumentNumber(value)) return "Debe tener entre 6 y 15 dígitos";
  return "";
};

export const validateNumeric = (value: string): string => {
  if (!isNonEmpty(value)) return "Este campo es obligatorio";
  if (!isNumeric(value)) return "Solo se permiten números";
  return "";
};
