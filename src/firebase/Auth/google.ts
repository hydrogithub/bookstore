import { auth } from "../config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const signInGoogle = async () => {
  let result = null,
    error = null;

  try {
    result = await signInWithPopup(auth, googleProvider);
  } catch (e) {
    error = e;
  }
  return { result, error };
};

export default signInGoogle;
