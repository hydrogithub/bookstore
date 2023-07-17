import { auth } from "../config";
import { signInWithEmailAndPassword } from "firebase/auth";

const signIn = async (email: string, password: string) => {
  let result = null,
    error = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }
  return { result, error };
};

export default signIn;
