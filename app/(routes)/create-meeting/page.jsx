"use client";
import React, { useState } from "react";
import MeetingForm from "./_components/MeetingForm";
import PreviewMeeting from "./_components/PreviewMeeting";

const CreateMeeting = () => {
  const [formValue, setFormValue] = useState();
  return (
    <div className=" grid grid-cols-1 md:grid-cols-3">
      <div className=" col-span-1 bg-blue-50 h-screen">
        <MeetingForm setFormValue={(e) => setFormValue(e)} />
      </div>
      <div className=" col-span-2">
        <PreviewMeeting formValue={formValue} />
      </div>
    </div>
  );
};

export default CreateMeeting;
