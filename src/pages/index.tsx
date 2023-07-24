import { useAuthContext } from "@/provider/AuthContext";
import { useRouter } from "next/router";
import React from "react";
import { User } from "firebase/auth";
import Home from "@/container/Home";
import { APP_ROUTES } from "@/global/constants/appRoutes";

const HomePage = () => {
  const { user } = useAuthContext() as { user: User };
  const router = useRouter();

  React.useLayoutEffect(() => {
    if (user == null) router.push(APP_ROUTES.login);
  }, [user]);
  return user ? <Home user={user} /> : <></>;
};

export default HomePage;
