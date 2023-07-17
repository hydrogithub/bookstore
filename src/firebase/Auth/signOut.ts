import { signOut as signOutApp } from "firebase/auth";
import { auth } from "../config";

const signOut = async () => {
  try {
    await signOutApp(auth);
  } catch (e) {
    console.log(e);
  }
};

export default signOut;
