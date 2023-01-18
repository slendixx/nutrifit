import {truncatePassword} from "@/lib/formatting";
import {generateLengthNString} from "@/__tests__/utils";

describe("truncatePassword", () => {
  it("truncates password after 256 characters", () => {
    //generate 2 passwords of length 256 and 257
    const shorterPassword = generateLengthNString(256, 'a');
    const longerPassword = generateLengthNString(257, 'b');

    expect(shorterPassword).toHaveLength(256);
    expect(truncatePassword(shorterPassword)).toHaveLength(256);

    expect(longerPassword).toHaveLength(257);
    expect(truncatePassword(longerPassword)).toHaveLength(256);
  })
})

