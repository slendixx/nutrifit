export function formatPassword(password:string){
  //Max length is 256. String.slice(n,m) returns characters from n (included) to m (not included).
  //That is why 257 is used instead of 256
  return password.slice(0, Math.min(password.length,257));
}