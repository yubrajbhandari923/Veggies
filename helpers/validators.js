export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Email can't be empty.";
  if (!re.test(email)) return 'Please enter a valid email address.';
  return '';
}

export function passwordValidator(password) {
  if (!password) return "Password can't be empty.";
  if (password.length < 6)
    return 'Password must be at least 6 characters long.';
  return '';
}

export function nameValidator(name) {
  if (!name) return "Name can't be empty.";
  if (name.length < 4) return 'Name must be at least 4 characters long';
  return '';
}
