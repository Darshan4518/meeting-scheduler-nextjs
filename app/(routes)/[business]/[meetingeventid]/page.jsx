"use client";

import React, { useEffect, useState } from "react";
import MeetingTimeDateSelection from "../_components/MeetingTimeDateSelection";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/config/firebaseConfig";

const ShareMeetingEvent = ({ params }) => {
  const db = getFirestore(app);

  const [businessInfo, setBusinessInfo] = useState();
  const [eventInfo, setEventInfo] = useState();
  const [loading, setLoding] = useState(false);
  useEffect(() => {
    params && getBusinessEventDetails();
  }, [params]);

  const getBusinessEventDetails = async () => {
    setLoding(true);
    const q = query(
      collection(db, "Business"),
      where("businessName", "==", params.business)
    );
    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      setBusinessInfo(doc.data());
    });

    const docRef = doc(db, "MeetingEvent", params?.meetingeventid);
    const res = await getDoc(docRef);
    setEventInfo(res.data());
    setLoding(false);
  };
  return (
    <div>
      <MeetingTimeDateSelection
        eventInfo={eventInfo}
        businessInfo={businessInfo}
      />
    </div>
  );
};

export default ShareMeetingEvent;
