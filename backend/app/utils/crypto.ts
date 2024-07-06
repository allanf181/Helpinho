import { createHash } from "crypto";

export function encryptText(text: string) {
  console.log(text, "SENHA AQUI PORRA");
  return createHash("sha256").update(text).digest("hex");
}
