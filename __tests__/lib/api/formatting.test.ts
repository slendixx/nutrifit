import {generateLengthNString} from "@/__tests__/utils";
import {SignupData, trimNameAndEmail, truncatePassword} from "@/lib/api/users";

describe("truncatePassword()", () => {

  it("truncates password after 256 characters", () => {
    //generate 2 passwords of length 256 and 257
    const shorterPassword = mockSignupData();
    const longerPassword = mockSignupData();
    shorterPassword.password = generateLengthNString(256, 'a');
    longerPassword.password = generateLengthNString(257, 'b');

    expect(shorterPassword.password).toHaveLength(256);
    truncatePassword(shorterPassword);
    expect(shorterPassword.password).toHaveLength(256);

    expect(longerPassword.password).toHaveLength(257);
    truncatePassword(longerPassword);
    expect(longerPassword.password).toHaveLength(256);
  })
})

describe("trim()", () => {
  it("trims first and last names and email", () => {
    const signupData = mockSignupData();
    trimNameAndEmail(signupData);

    expect(signupData).toMatchObject({
      firstName: 'brenda',
      lastName: 'jacobs',
      email: 'brendajacobs@email.com'
    })
  });
})

function mockSignupData(): SignupData {
  return {
    firstName: '    brenda    ',
    lastName: '    jacobs    ',
    email: '    brendajacobs@email.com    ',
    password: 'brenda123'
  };
}
