import { randomBytes, createHash } from 'node:crypto';


export const generatePasswordResetToken = () => {
  return randomBytes(32).toString("hex");
};


export const hashPasswordResetToken = (token) => {
  return createHash("sha256")
    .update(token, "utf8")
    .digest("hex")
};