const validateField = (value, rules) => {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return "";
};

const rules = {
  required: (value) =>
    value != null && value.trim() !== "" ? "" : "This field is required.",
  email: (value) =>
    value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? ""
      : "Enter a valid email.",
  min: (length) => (value) =>
    value && value.length >= length
      ? ""
      : `Must be at least ${length} characters.`,
  max: (length) => (value) =>
    value && value.length <= length
      ? ""
      : `Must be no more than ${length} characters.`,
  number: (value) =>
    value && /^\d+$/.test(value) ? "" : "Only numeric values are allowed.",
  alphabet: (value) =>
    value && /^[a-zA-Z]+$/.test(value)
      ? ""
      : "Only alphabetic characters are allowed.",
  confirmPassword: (password) => (value) =>
    value === password ? "" : "Passwords do not match.",
};

export { validateField, rules };
