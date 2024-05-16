import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
export const publicKey = Buffer.from(
  process.env.PUBLIC_KEY || "",
  "base64"
).toString("ascii");
export const privateKey = Buffer.from(
  process.env.PRIVATE_KEY || "",
  "base64"
).toString("ascii");
//@typescript-eslint/no-non-null-assertion
export const signJwt = (
  object: Object,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    return jwt.verify(token, publicKey) as T;
  } catch (err) {
    if (err instanceof Error) {
      return null;
    }
    return null;
  }
};
