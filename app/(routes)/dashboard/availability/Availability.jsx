"use client";
import DaysList from "@/app/_utils/DaysList";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { app } from "@/config/firebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export const Availability = () => {
  const [availabilityDays, setAvailabilityDays] = useState([]);
  // {
  //   Sunday: false,
  // },
  // {
  //   Monday: false,
  // },
  // {
  //   Tuesday: false,
  // },
  // {
  //   Wendsday: false,
  // },
  // {
  //   Thursday: false,
  // },
  // {
  //   Friday: false,
  // },
  // {
  //   Saturday: false,
  // }
  const [startTime, setStartTime] = useState();
  const [EndTime, setEndTime] = useState();

  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  const onHandleChange = (day, value) => {
    setAvailabilityDays({
      ...availabilityDays,
      [day]: value,
    });
  };
  useEffect(() => {
    user && getBusinessInfo();
  }, [user]);

  const getBusinessInfo = async () => {
    const docRef = doc(db, "Business", user?.email);
    const docSnap = await getDoc(docRef);
    const res = docSnap.data();
    setAvailabilityDays(res.availabilityDays);
    setStartTime(res.startTime);
    setEndTime(res.EndTime);
  };

  const onHandleSave = async () => {
    const docRef = doc(db, "Business", user?.email);
    await updateDoc(docRef, {
      availabilityDays: availabilityDays,
      startTime: startTime,
      EndTime: EndTime,
    }).then((res) => {
      toast("chages updated !");
    });
  };

  return (
    <div className=" p-10">
      <h2 className=" font-bold text-3xl">Availability</h2>
      <hr className=" my-6" />
      <div>
        <h2 className=" font-bold text-lg ">Availability Days</h2>
        <div className=" grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
          {DaysList?.map((days, ind) => {
            return (
              <h2 className=" flex gap-x-2 items-center" key={ind}>
                <Checkbox
                  checked={
                    availabilityDays && availabilityDays[days?.day]
                      ? availabilityDays[days?.day]
                      : false
                  }
                  onCheckedChange={(e) => {
                    onHandleChange(days.day, e);
                  }}
                />
                {days.day}
              </h2>
            );
          })}
        </div>
        <div className=" mt-10">
          <h2 className=" font-bold text-lg "> Availability Time</h2>
          <div className=" flex gap-4 mt-5">
            <div>
              <h2 className=" font-medium my-2">Start Time</h2>
              <Input
                type="time"
                defaultValue={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
              />
            </div>
            <div>
              <h2 className=" font-medium my-2">End Time</h2>
              <Input
                type="time"
                defaultValue={EndTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <Button className="mt-10" onClick={() => onHandleSave()}>
          Save
        </Button>
      </div>
    </div>
  );
};
