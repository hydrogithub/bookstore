import { auth } from "../config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const signUp = async (email: string, password: string) => {
  let result = null,
    error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }
  return { result, error };
};

export default signUp;
