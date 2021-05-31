// This function is used to provide error messages to the user that are
// different than the error messages provided by the SDK.
export default function enhanceMessage(message = '', code?: number) {
  switch (code) {
    case 20101: // Invalid token error
      return message + '. Please make sure you are using the correct credentials.';
    case 53118:
      return 'Llamada terminada';
    default:
      return message;
  }
}
