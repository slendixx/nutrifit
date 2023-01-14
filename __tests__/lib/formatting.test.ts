import {formatPassword} from "@/lib/formatting";

it("truncates password after 256 characters",()=>{
  //generate 2 passwords of length 256 and 257
  const shorterPassword = new Array(256 + 1).join("a");
  const longerPassword = new Array(257 + 1).join("b");

  expect(shorterPassword).toHaveLength(256);
  expect(formatPassword(shorterPassword)).toHaveLength(256);

  expect(longerPassword).toHaveLength(257);
  expect(formatPassword(longerPassword)).toHaveLength(257);
})