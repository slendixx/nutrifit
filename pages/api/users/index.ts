import {NextApiRequest, NextApiResponse} from 'next';
import {hash} from "bcrypt";
import {calculateHashCost} from "@/lib/security";
import dbConnection from "@/config/dbConnection";
import {OkPacket} from "mysql2"
import {
  isSignupData,
  SignupData, trimNameAndEmail,
  truncatePassword,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword
} from "@/lib/api/users";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      isSignupData(req.body);
      validateEmail(req.body);
      validateFirstName(req.body);
      validateLastName(req.body);
      validatePassword(req.body);
    } catch (error) {
      return res.status(400)
        .json({message: error.message});
    }
    const signupData: SignupData = req.body;
    //formatting
    truncatePassword(signupData);
    trimNameAndEmail(signupData);
    //hash password
    const hashCost = await calculateHashCost();
    const hashedPassword = await hash(signupData.password, hashCost);

    try {
      await dbConnection.query<OkPacket>("INSERT INTO nutritionist (email, first_name, last_name, password) VALUES (?,?,?,?);", [signupData.email, signupData.firstName, signupData.lastName, hashedPassword]);
    } catch (error) {
      if (/duplicate entry .* for key 'nutritionist.email_unique'/i.test(error.message)) {
        return res.status(400)
          .json({message: "An account with the same email already exists"});
      }
      return res.status(400)
        .json({message: error.message});
    }

    return res.status(201)
      .json({message: 'nutritionist account created'});
  }
  return res.status(404).end();
}

