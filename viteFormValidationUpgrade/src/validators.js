function checkEmail(email) {
  const errors = [];
  if (email.length === 0) {
    errors.push("Required");
  }
  if (!email.endsWith("@webdevsimplified.com")) {
    errors.push("Must end with @webdevsimplified.com");
  }
}

function checkPassword(password) {
  const errors = [];

  if (password.length < 10) {
    errors.push("password must be at least 10 characters");
  }
}
