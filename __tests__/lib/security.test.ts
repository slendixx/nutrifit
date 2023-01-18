import bcrypt from "bcrypt";
import {calculateHashCost} from "@/lib/security";

it("calculates an appropiate number of salt rounds for bcrypt", async () => {
  const rounds = await calculateHashCost();
  const hashStartTime = Date.now();
  //hash some password with the calculated number of rounds
  await bcrypt.hash("brenda123", rounds);
  const hashTime = Date.now() - hashStartTime;
  expect(hashTime).toBeGreaterThanOrEqual(250,);
})
it('initializes global hashCost', async () => {
  const rounds = await calculateHashCost();
  expect(rounds).toBe(securityParams.hashCost);
});
