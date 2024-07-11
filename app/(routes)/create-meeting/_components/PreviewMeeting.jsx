"use client";
import { Clock, LinkIcon, MapPin } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const PreviewMeeting = ({ formValue }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState();

  /*
   * @param {*} interval
   */
  useEffect(() => {
    formValue?.duration && createTimeSlot(formValue?.duration);
  }, [formValue]);
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

  return (
    <div className=" p-5 py-10 shadow-md m-5 border-t-8 border-green-500">
      <Image src="/logo.svg" width={120} height={100} alt="logo" />
      <div className=" grid grid-cols-1 md:grid-cols-3 mt-5">
        <div className=" p-4 border-r border-gray-200">
          <h2 className=" font-medium p-2">Business Name</h2>
          <h2 className=" text-3xl font-bold line-clamp-2  break-words max-w-[300px]">
            {formValue?.eventName ? formValue?.eventName : "Meeting Name"}
          </h2>
          <div className=" mt-4 flex flex-col gap-4">
            <h2 className=" flex gap-x-2">
              <Clock />
              {formValue?.duration ? formValue?.duration : 0} min
            </h2>
            <h2 className=" flex gap-x-2">
              <MapPin />
              {formValue?.locationType ? formValue?.locationType : "meeting"}
            </h2>

            <h2 className=" flex gap-x-2  ">
              <LinkIcon className="" />
              <Link href={formValue?.locationUrl ? formValue?.locationUrl : ""}>
                <p className="text-primary line-clamp-2  break-words max-w-[200px]">
                  {formValue?.locationUrl
                    ? formValue?.locationUrl
                    : "Meeting url"}
                </p>
              </Link>
            </h2>
          </div>
        </div>
        <div className=" md:col-span-2 flex px-3">
          <div className=" flex flex-col ">
            <h2 className=" font-bold text-lg ">Select Date & Time</h2>

            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mt-5"
              disabled={(date) => date <= new Date()}
            />
          </div>
          <div
            className="flex flex-col w-full overflow-auto gap-4 p-3  overflow-y-scroll no-scrollbar"
            style={{ maxHeight: "400px" }}
          >
            {timeSlots?.map((time, index) => (
              <Button
                className="border-primary
                         text-primary"
                variant="outline"
                key={index}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewMeeting;
