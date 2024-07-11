"use client";

import { app } from "@/config/firebaseConfig";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingType from "./meeting-type/page";
import { Toaster } from "sonner";

const Dashboard = () => {
  const [loder, setLoder] = useState(true);
  const router = useRouter();

  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  useEffect(() => {
    user && isBusinessRegister();
  }, [user]);
  const isBusinessRegister = async () => {
    const docRef = doc(db, "Business", user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setLoder(false);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      setLoder(false);
      router.replace("/createbusiness");
    }
  };
  if (loder) {
    return <h2>Loding....</h2>;
  }
  return (
    <div>
      <MeetingType />
      <Toaster />
    </div>
  );
};

export default Dashboard;
