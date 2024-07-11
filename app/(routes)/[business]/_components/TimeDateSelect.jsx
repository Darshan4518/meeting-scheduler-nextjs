import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

const TimeDateSelect = ({
  date,
  handleDateChange,
  timeSlots,
  enabletimeSlots,
  setSelectTime,
  selectTime,
  prevBooking,
}) => {
  const checkTimeSlot = (time) => {
    return prevBooking.filter((item) => item.selectedTime == time).length > 0;
  };

  return (
    <div className=" md:col-span-2 flex px-3">
      <div className=" flex flex-col ">
        <h2 className=" font-bold text-lg ">Select Date & Time</h2>

        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            handleDateChange(d);
          }}
          className="rounded-md border mt-5"
          disabled={(date) => date <= new Date()}
        />
      </div>
      <div
        className="flex flex-col w-full overflow-auto gap-4 p-3  overflow-y-scroll no-scrollbar cursor-pointer"
        style={{ maxHeight: "400px" }}
      >
        {timeSlots?.map((time, index) => (
          <Button
            className={`border-primary
               text-primary ${
                 time == selectTime ? " bg-primary text-white" : ""
               } `}
            variant="outline"
            key={index}
            disabled={!enabletimeSlots || checkTimeSlot(time)}
            onClick={() => setSelectTime(time)}
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimeDateSelect;
