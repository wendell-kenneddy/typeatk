import { generate } from "random-words";
import { v4 } from "uuid";

export function getRandomWord() {
  return generate({ exactly: 1, seed: v4() })[0];
}
