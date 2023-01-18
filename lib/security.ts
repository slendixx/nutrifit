import bcrypt from "bcrypt";

const TARGET_MINIMUM_HASH_DURATION_MS = 250;
export async function calculateHashCost(){
  let cost = 10;
  const startTime = Date.now();
  await bcrypt.hash('microbenchmark', cost);
  const endTime = Date.now();
  let hashDuration = endTime - startTime;
  //Increasing cost by 1 would double the run time.
  //Keep increasing cost until the estimated duration is over 250 ms
  while (hashDuration <= TARGET_MINIMUM_HASH_DURATION_MS) {
    cost += 1;
    hashDuration *= 2;
  }

  return cost;
}
