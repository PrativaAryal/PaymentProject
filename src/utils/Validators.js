// src/utils/Validators.js

export const validators = {
  username: (v) =>
    v && v.trim().length >= 3 ? "" : "Name must be at least 3 characters",

  mail: (v) =>
    /\S+@\S+\.\S+/.test(v) ? "" : "Enter a valid email address",

  mobile_number: (v) =>
    /^\d{10}$/.test(v)
      ? ""
      : "Mobile number must be exactly 10 digits",

  password: (v) =>
    v && v.length >= 6
      ? ""
      : "Password must be at least 6 characters",

  confirmPassword: (v, all) =>
    v === all.password ? "" : "Passwords do not match",

  otp: (v) => (v ? "" : "OTP is required"),

  newPassword: (v) =>
    v && v.length >= 6
      ? ""
      : "New password must be at least 6 characters",
};

export const validateField = (name, value, all = {}) => {
  if (!validators[name]) return "";
  return validators[name](value, all);
};
