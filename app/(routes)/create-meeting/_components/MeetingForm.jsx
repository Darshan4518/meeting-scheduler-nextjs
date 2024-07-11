"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LocationOption from "@/app/_utils/LocationOption";
import Image from "next/image";
import { useEffect, useState } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const MeetingForm = ({ setFormValue }) => {
  const [location, setLocation] = useState();
  const [eventName, setEventName] = useState();
  const [duration, setDuration] = useState(30);
  const [locationType, setLocationType] = useState();
  const [locationUrl, setLocationUrl] = useState();

  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  const router = useRouter();

  useEffect(() => {
    setFormValue({
      eventName: eventName,
      duration: duration,
      locationType: locationType,
      locationUrl: locationUrl,
    });
  }, [eventName, duration, locationType, locationUrl]);

  const onEventStoreDb = async () => {
    const id = Date.now().toString();
    await setDoc(doc(db, "MeetingEvent", id), {
      id: id,
      eventName: eventName,
      duration: duration,
      locationType: locationType,
      locationUrl: locationUrl,
      id: id,
      businessId: doc(db, "Business", user?.email),
      createdBy: user?.email,
    }).then((res) => console.log(res));
    toast("New Meeting Event added");
    router.replace("/dashboard/meeting-type");
  };

  return (
    <div className=" p-4">
      <h2 className=" flex gap-x-2 font-bold">
        <ChevronLeft /> Cancel
      </h2>
      <h2 className=" mt-3 text-2xl  font-bold py-3">Create new event</h2>
      <hr />
      <h2 className=" my-2 py-3 text-gray-500 font-bold">Event Name *</h2>
      <Input
        varient="outline"
        placeholder="Name of your meeting event"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <h2 className=" my-2 py-3 text-gray-500 font-bold">Duration *</h2>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className=" px-9">
            {duration} min
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setDuration(15)}>
            15 min
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDuration(30)}>
            30 min
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDuration(45)}>
            45 min
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDuration(60)}>
            60 min
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <h2 className=" my-3 py-3 text-gray-500 font-bold">Locatoin *</h2>
      <div className=" flex gap-4 grid-cols-4">
        {LocationOption.map((opt, ind) => {
          return (
            <div
              key={ind}
              className={` border flex flex-col items-center px-8 py-2 justify-center cursor-pointer rounded-lg  hover:bg-blue-100 hover:border-primary`}
              onClick={() => setLocationType(opt.name)}
            >
              <Image src={opt.icon} alt={opt.name} height={40} width={40} />
              <p>{opt.name}</p>
            </div>
          );
        })}
      </div>
      {locationType && (
        <div>
          <h2 className=" my-2 py-3 text-gray-500 font-bold">
            Add {location} URL
          </h2>
          <Input
            placeholder="add url"
            value={locationUrl}
            onChange={(e) => setLocationUrl(e.target.value)}
          />
        </div>
      )}
      <Button
        className=" w-full mt-7"
        disabled={!eventName || !duration || !locationType || !locationUrl}
        onClick={() => onEventStoreDb()}
      >
        Create
      </Button>
    </div>
  );
};

export default MeetingForm;
