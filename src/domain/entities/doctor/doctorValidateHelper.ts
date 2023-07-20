import { validateDoctor } from "./doctor";
import { passwordHashing } from "../user/userValidationHelper";//this method will hash the password
import randomstring from "randomstring";

//create a random and temporary password for doctom
const generateRandomPassword = (length: number) => {
  return randomstring.generate(length);
};

export const doctorValidateHelper=validateDoctor(passwordHashing,generateRandomPassword)

