export type SignupData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export function isSignupData(object): asserts object is SignupData {
  if (!('email' in object)) throw new Error('no email was provided');
  if (!('firstName' in object)) throw new Error('no first name was provided');
  if (!('lastName' in object)) throw new Error('no last name was provided');
  if (!('password' in object)) throw new Error('no password was provided');
}

export function validateEmail(data: SignupData) {
  if (data.email === '') throw new Error('email can\'t be empty');
  if (data.email.length > 100) throw new Error('email length must be less than or equal to 100 characters long');
  if (!(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(data.email))) throw new Error('invalid email');
}

export function validateFirstName(data: SignupData) {
  if (data.firstName === '') throw new Error('first name can\'t be empty');
  if (data.firstName.length > 30) throw new Error('first name length must be less than or equal to 30 characters long');
}

export function validateLastName(data: SignupData) {
  if (data.lastName === '') throw new Error('last name can\'t be empty');
  if (data.lastName.length > 30) throw new Error('last name length must be less than or equal to 30 characters long');
}

export function validatePassword(data: SignupData) {
  if (data.password === '') throw new Error('password can\'t be empty');
}

//formatting
export function truncatePassword(signupData: SignupData) {
  signupData.password = signupData.password.slice(0, Math.min(signupData.password.length, 256));
}

export function trimNameAndEmail(signupData: SignupData) {
  signupData.firstName = signupData.firstName.trim();
  signupData.lastName = signupData.lastName.trim();
  signupData.email = signupData.email.trim();
}
