import * as argon2 from "argon2";

export const encryptPassword = async (password: string): Promise<string> => {
  const hashedPassword = await argon2.hash(password, {
    type: argon2.argon2id,
    timeCost: 2,
    memoryCost: 2 ** 16,
    parallelism: 1,
  })
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await argon2.verify(hash, password);
};
