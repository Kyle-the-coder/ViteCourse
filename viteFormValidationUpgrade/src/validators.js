export function checkEmail(email) {
  const errors = [];
  if (email.length === 0) {
    errors.push("Required");
  }
  if (!email.endsWith("@webdevsimplified.com")) {
    errors.push("Must end with @webdevsimplified.com");
  }
  return errors;
}

export function checkPassword(password) {
  const errors = [];

  if (password.length < 10) {
    errors.push("password must be at least 10 characters");
  }
  if (!password.match(/[a-z]/)) {
    errors.push("password must include a lowercase letter");
  }
  if (!password.match(/[A-Z]/)) {
    errors.push("password must include a uppercase letter");
  }
  if (!password.match(/[0-9]/)) {
    errors.push("password must include a number");
  }
  return errors;
}
