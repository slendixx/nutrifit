import { NextApiRequest, NextApiResponse } from 'next';
import {formatPassword} from "@/lib/formatting";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    isSignupData(req.body);
    validateEmail(req.body);
    validateFirstName(req.body);
    validateLastName(req.body);
    validatePassword(req.body);
  } catch (error) {
    return res.status(400)
      .json({ message: error.message });
  }
  const signupData:SignupData = req.body;
  signupData.password =  formatPassword(signupData.password)

  return res.status(200)
    .json({ message: 'hi from API' });
}
export type SignupData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

function isSignupData(object): asserts object is SignupData {
  if (!('email' in object)) throw new Error('no email was provided');
  if (!('firstName' in object)) throw new Error('no first name was provided');
  if (!('lastName' in object)) throw new Error('no last name was provided');
  if (!('password' in object)) throw new Error('no password was provided');
}

function validateEmail(data: SignupData) {
  if (data.email === '') throw new Error('email can\'t be empty');
  if (data.email.length > 100) throw new Error('email length must be less than or equal to 100 characters long');
  if (!(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(data.email))) throw new Error('invalid email');
}

function validateFirstName(data: SignupData) {
  if (data.firstName === '') throw new Error('first name can\'t be empty');
  if (data.firstName.length > 30) throw new Error('first name length must be less than or equal to 30 characters long');
}

function validateLastName(data: SignupData) {
  if (data.lastName === '') throw new Error('last name can\'t be empty');
  if (data.lastName.length > 30) throw new Error('last name length must be less than or equal to 30 characters long');
}

function validatePassword(data: SignupData) {
  if (data.password === '') throw new Error('password can\'t be empty');
}
