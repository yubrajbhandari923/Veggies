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

export function phoneValidator(num) {
  if (!num) return "Phone Number can't be empty.";
  if (num.length < 6) return 'Phone number must be at least 6 characters';

  if (typeof (parseInt(num) ? parseInt(num) : null) != 'number')
    return 'Phone number should be a number';
  return '';
}

export function districtValidator(district) {
  if (!district) return "District can't be empty.";
  if (district.length < 4) return 'District must be at least 4 characters';
  return '';
}

export function municipalityValidator(municipality) {
  if (!municipality) return "Municipality can't be empty.";
  if (municipality.length < 4)
    return 'Municipality must be at least 4 characters';
  return '';
}

export function wardValidator(ward) {
  if (!ward) return "Ward can't be empty.";
  if (typeof (parseInt(ward) ? parseInt(ward) : null) != 'number')
    return 'Ward should be a number';
  return '';
}

export function tolValidator(tol) {
  if (!tol) return "Tol can't be empty.";
  if (tol.length < 4) return 'Tol must be at least 4 characters';
  return '';
}

export function streetValidator(street) {
  if (!street) return "Street can't be empty.";
  if (street.length < 4) return 'Street must be at least 4 characters';
  return '';
}
