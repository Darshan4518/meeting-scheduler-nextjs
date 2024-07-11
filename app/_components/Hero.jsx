import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className=" flex justify-center items-center p-4 mt-8">
      <div className="hidden lg:block">
        <Image
          src="/profile1.png"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute top-48 right-36"
          alt="profile"
        />

        <Image
          src="/profile3.png"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute top-48 left-16"
          alt="profile"
        />
        <Image
          src="/profile2.png"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute bottom-20 left-36"
          alt="profile"
        />
        <Image
          src="/profile2.png"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute right-16 bottom-32"
          alt="profile"
        />
      </div>
      <div className=" text-center max-w-3xl">
        <h2 className=" text-[60px] font-bold text-slate-700 ">
          Easy scheduling ahead
        </h2>
        <p className=" text-xl text-slate-500 mt-5">
          Scheduling Automation platform for eliminating back-and-forth email to
          find perfect time -- and so much more
        </p>
        <p className=" mt-7 font-bold">Sign up free with Google and Facebook</p>
        <div className=" mt-5 flex justify-center gap-x-8 pb-4">
          <Button className=" flex gap-x-2 p-7 items-center ">
            <Image src="/google.png" alt="google" height={35} width={35} />
            <p className=" text-sm ">SignUp with Google</p>
          </Button>
          <Button className=" flex gap-x-2 p-7 items-center">
            <Image src="/facebook.png" alt="fb" height={35} width={35} />
            <p className=" text-sm ">SignUp with Facebook</p>
          </Button>
        </div>
        <hr />
        <p className=" mt-5 font-bold">
          <Link href={"/"} className=" text-primary px-2">
            SignUp Free with Gmail
          </Link>
          "No credit card required"
        </p>
      </div>
    </div>
  );
};

export default Hero;
