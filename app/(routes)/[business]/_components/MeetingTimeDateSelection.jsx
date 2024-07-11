"use client";

import { CalendarDays, Clock, LinkIcon, MapPin, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import TimeDateSelect from "./TimeDateSelect";
import UserFormInfo from "./UserFormInfo";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

const MeetingTimeDateSelection = ({ eventInfo, businessInfo }) => {
  // console.log(businessInfo?.availabilityDays);

  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState();
  const [enabletimeSlots, setEnableTimeSlots] = useState(false);
  const [selectTime, setSelectTime] = useState();
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userNote, setUserNote] = useState();
  const [loading, setLoading] = useState(false);
  const [prevBooking, setPrevBooking] = useState([]);

  const router = useRouter();

  /*
   * @param {*} interval
   */
  useEffect(() => {
    eventInfo?.duration && createTimeSlot(eventInfo?.duration);
  }, [eventInfo]);
  const createTimeSlot = (interval) => {
    const startTime = 8 * 60; // 8 AM in minutes
    const endTime = 22 * 60; // 10 PM in minutes
    const totalSlots = (endTime - startTime) / interval;
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
      const period = hours >= 12 ? "PM" : "AM";
      return `${String(formattedHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")} ${period}`;
    });

    setTimeSlots(slots);
  };

  const handleDateChange = (date) => {
    setDate(date);
    const day = format(date, "EEEE");
    if (businessInfo?.availabilityDays?.[day]) {
      getPrevEventBooking(date);
      setEnableTimeSlots(true);
    } else {
      setEnableTimeSlots(false);
    }
  };

  const db = getFirestore(app);

  const handleScheduleEvent = async () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(userEmail) == false) {
      toast("Enter valid email address");
      return;
    }
    const docId = Date.now().toString();
    setLoading(true);
    await setDoc(doc(db, "ScheduledMeetings", docId), {
      businessName: businessInfo.businessName,
      businessEmail: businessInfo.email,
      selectedTime: selectTime,
      selectedDate: date,
      formatedDate: format(date, "PPP"),
      formatedTimeStamp: format(date, "t"),
      duration: eventInfo.duration,
      locationUrl: eventInfo.locationUrl,
      eventId: eventInfo.id,
      id: docId,
      userName: userName,
      userEmail: userEmail,
      userNote: userNote,
    }).then((resp) => {
      toast("Meeting Scheduled successfully!");
      router.replace("/");
    });
  };

  const getPrevEventBooking = async (date_) => {
    const q = query(
      collection(db, "ScheduledMeetings"),
      where("selectedDate", "==", date_),
      where("eventId", "==", eventInfo.id)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setPrevBooking((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <div className=" p-5 py-10 shadow-md m-5 border-t-8 border-green-500 max-10 md:mx-26 lg:mx-56 my-10">
      <Image src="/logo.svg" width={120} height={100} alt="logo" />
      <div className=" grid grid-cols-1 md:grid-cols-3 mt-5">
        <div className=" p-4 border-r border-gray-200">
          <h2 className=" font-medium p-2">{businessInfo?.businessName}</h2>
          <h2 className=" text-3xl font-bold line-clamp-2  break-words max-w-[300px]">
            {eventInfo?.eventName ? eventInfo?.eventName : "Meeting Name"}
          </h2>

          <div className=" mt-4 flex flex-col gap-4">
            <h2 className=" flex gap-x-2">
              <Clock />
              {eventInfo?.duration ? eventInfo?.duration : 0} min
            </h2>
            <h2 className=" flex gap-x-2">
              <MapPin />
              {eventInfo?.locationType ? eventInfo?.locationType : "meeting"}
            </h2>
            <h2 className=" font-medium  flex gap-x-2 ">
              <CalendarDays /> {format(date, "PPP")}
            </h2>
            {selectTime && (
              <h2 className=" font-medium  flex gap-x-2 ">
                <TimerIcon /> {selectTime}
              </h2>
            )}
            <h2 className=" flex gap-x-2  ">
              <LinkIcon className="" />
              <Link href={eventInfo?.locationUrl ? eventInfo?.locationUrl : ""}>
                <p className="text-primary line-clamp-2  break-words max-w-[200px]">
                  {eventInfo?.locationUrl
                    ? eventInfo?.locationUrl
                    : "Meeting url"}
                </p>
              </Link>
            </h2>
          </div>
        </div>
        {step == 1 ? (
          <TimeDateSelect
            date={date}
            handleDateChange={handleDateChange}
            timeSlots={timeSlots}
            enabletimeSlots={enabletimeSlots}
            setSelectTime={setSelectTime}
            selectTime={selectTime}
            prevBooking={prevBooking}
          />
        ) : (
          <UserFormInfo
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            setUserNote={setUserNote}
          />
        )}
      </div>
      <div className=" py-10 flex justify-end">
        {step == 2 && (
          <Button className="  mx-2" onClick={() => setStep(1)}>
            Back
          </Button>
        )}
        {step == 1 ? (
          <Button
            className=" float-right mx-2"
            disabled={!selectTime || !date}
            onClick={() => setStep(step + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            className=" float-right mx-2"
            disabled={!userName || !userEmail}
            onClick={() => handleScheduleEvent()}
          >
            Schedule
          </Button>
        )}
      </div>
    </div>
  );
};

export default MeetingTimeDateSelection;
