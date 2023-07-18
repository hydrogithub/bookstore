import React, { useEffect, useState } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebase_app from "@/firebase/config";

const HomePage = () => {
  const [token, setToken] = useState<string[]>();
  const [messages, setMessages] = useState<string[]>([]);

  const requestPermission = () => {
    console.log("Requesting permission...");

    Notification.requestPermission().then((permission) => {
      console.log(permission);
    });
  };

  useEffect(() => {
    requestPermission();

    getToken(getMessaging(firebase_app), {
      vapidKey:
        "BJcGMAHGrbk3ISsjtQXxyKb2qVOkY-aN2HQ3mG-IvIjtT8QxPK0lrayVbHELl_F-fpklp-Ij9K_7gPqKNQNIwBs",
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log(currentToken);

          setToken([currentToken]);
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });
  }, []);

  useEffect(() => {
    if (!token?.length) return;

    onMessage(getMessaging(firebase_app), (payload) => {
      console.log(payload);

      setMessages((pre) => [...pre, payload.data?.payload || ""]);
    });
  }, [token]);

  return (
    <>
      <p>content </p>
      {messages.map((e, ind) => (
        <p key={ind}>{e}</p>
      ))}
    </>
  );
};

export default HomePage;
