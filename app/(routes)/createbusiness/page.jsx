"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { app } from "@/config/firebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreateBusiness = () => {
  const router = useRouter();
  const [businessName, setBusinessName] = useState();
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const createBusiness = async () => {
    await setDoc(doc(db, "Business", user.email), {
      businessName: businessName,
      email: user.email,
      name: user.given_name,
    }).then((data) => {
      console.log("document saved");
      toast("New Business added");
      router.replace("/dashboard");
    });
  };
  return (
    <div className=" flex flex-col items-center gap-20 p-10 my-6 ">
      <Image src="/logo.svg" width={200} height={100} alt="logo" />
      <div className=" flex flex-col  mt-5 gap-6 items-center max-w-3xl">
        <h2 className=" text-4xl font-bold ">
          What should be call your Business?
        </h2>
        <p className=" text-gray-500">
          You can also change this after from settings
        </p>
        <div className=" w-full">
          <label htmlFor="tn" className=" text-slate-500">
            Team Name
          </label>
          <Input
            className=" mt-4"
            placeholder="ex..DarshanYT"
            onClick={(e) => {
              setBusinessName(e.target.value);
            }}
          />
        </div>
        <Button
          className="w-full"
          disabled={!businessName}
          onClick={createBusiness}
        >
          Create Business
        </Button>
      </div>
    </div>
  );
};

export default CreateBusiness;
