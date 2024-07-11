"use client";
import React, { useEffect, useState } from "react";

import {
  getDocs,
  getFirestore,
  collection,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Clock, Copy, MapPin, Pen, Settings, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MeetingEventList = () => {
  const [eventList, setEventList] = useState([]);
  const [businessInfo, setBusinessInfo] = useState();
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  const getMeetingList = async () => {
    setEventList([]);
    const q = query(
      collection(db, "MeetingEvent"),
      where("createdBy", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setEventList((prevEvent) => [...prevEvent, doc.data()]);
    });
  };
  useEffect(() => {
    user && getMeetingList();
    user && getBusinessInfo();
  }, [user]);

  const onMeetingDelete = async (event) => {
    await deleteDoc(doc(db, "MeetingEvent", event?.id)).then((res) => {
      getMeetingList();
      toast(" Meeting Event Deleted");
    });
  };

  const getBusinessInfo = async () => {
    const docRef = doc(db, "Business", user.email);

    const docSnap = await getDoc(docRef);
    setBusinessInfo(docSnap.data());
  };

  const onClickCopyHandler = (event) => {
    console.log(event.id);
    const meetingUrl =
      process.env.NEXT_PUBLIC_BASE_URL +
      "/" +
      businessInfo.businessName +
      "/" +
      event.id;
    navigator.clipboard.writeText(meetingUrl);
    toast("copied to clipboard");
  };

  return (
    <div className=" mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-7">
      {eventList.length > 0 ? (
        eventList?.map((event, ind) => {
          return (
            <div
              key={ind}
              className=" border border-t-8 shadow-md  rounded-lg  flex flex-col gap-3 p-4"
              style={{ borderTopColor: "orange" }}
            >
              <div className=" flex justify-end cursor-pointer ">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Settings />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className=" flex gap-x-2">
                      <Pen /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className=" flex gap-x-2"
                      onClick={() => {
                        onMeetingDelete(event);
                      }}
                    >
                      <TrashIcon />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h2 className=" font-medium text-2xl">{event?.eventName}</h2>
              <div className=" flex justify-between">
                <h2 className=" font-medium flex gap-x-2 items-center text-gray-500">
                  <Clock /> {event?.duration} min
                </h2>
                <h2 className=" flex gap-x-2 text-gray-500">
                  <MapPin />
                  {event?.locationType}
                </h2>
              </div>
              <hr />
              <div className=" flex justify-between items-center py-2">
                <h2
                  className=" text-primary flex items-center text-sm gap-x-2 cursor-pointer"
                  onClick={() => {
                    onClickCopyHandler(event);
                  }}
                >
                  <Copy /> Copy Link
                </h2>
                <Button
                  variant="outline"
                  className=" rounded-full text-primary border-primary"
                >
                  Share
                </Button>
              </div>
            </div>
          );
        })
      ) : (
        <h2>Loding...</h2>
      )}
    </div>
  );
};

export default MeetingEventList;
