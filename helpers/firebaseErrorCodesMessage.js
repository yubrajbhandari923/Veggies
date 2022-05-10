// This function returns an appropriate message to be dispalyed based on error code
// We provide a code returned from Firebase and match the following cases
// A message is returned based on the matched data

export const errorCodeBasedOnFrbCode = code => {
  let message;
  switch (code) {
    case 'auth/email-already-exists':
      message = 'Sorry! the email already exists';
      break;

    case 'auth/account-exists-with-different-credential':
      message = 'The email is already in use by another login method';
      break;

    case 'auth/user-disabled':
      message = 'Sorry! The account has been disabled';
      break;

    case 'auth/invalid-email':
      message = 'Enter a valid email address';
      break;

    case 'auth/network-request-failed':
      message = 'Check your Internet Connection';
      break;

    case 'auth/id-token-expired':

    case 'auth/invalid-id-token':

    case 'auth/session-cookie-expired':
      message = 'Please Login again';
      break;

    case 'auth/uid-already-exists':

    case 'auth/email-already-in-use':
      message = 'Sorry! The user already exists';
      break;

    case 'auth/user-not-found':
      message = 'The user doesnt exist';
      break;

    case 'auth/wrong-password':
      message = 'Please enter valid credentials';
      break;

    case 'auth/invalid-phone-number':
      message = 'Please enter a valid phone number';
      break;

    case 'auth/phone-number-already-exists':
      message = 'Sorry! The phone number already exists';
      break;

    case 'auth/too-many-requests':
      message = 'Too many requests. Please try again later';
      break;

    case 'auth/invalid-verification-code':
      message = 'The code is invalid';
      break;

    case 'auth/user-not-admin':
      message = `This account isn't registered as a farmer`;
      break;

    case 'auth/user-not-consumer':
      message = `This account isn't registered as a consumer`;
      break;

      case "auth/user-cancelled":
        message = `User Cancelled the Process`
        break

    default:
      message = 'Sorry! There was an error';
      break;
  }
  return message;
};
