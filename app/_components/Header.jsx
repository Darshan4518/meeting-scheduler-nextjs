"use client";
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";

const Header = () => {
  return (
    <header className=" flex items-center justify-between p-5 shadow-sm">
      <Image
        src="/logo.svg"
        width={100}
        height={100}
        alt="logo"
        className=" w-[120px]  md:w-[130px] "
      />

      <ul className=" hidden  md:flex gap-x-10 font-medium">
        <li className=" hover:text-primary transition-all duration-150 cursor-pointer">
          Product
        </li>
        <li className=" hover:text-primary transition-all duration-150 cursor-pointer">
          Pricing
        </li>
        <li className=" hover:text-primary transition-all duration-150 cursor-pointer">
          About Us
        </li>
        <li className=" hover:text-primary transition-all duration-150 cursor-pointer">
          Contact Us
        </li>
      </ul>
      <div className=" flex space-x-2 items-center">
        <LoginLink>
          <Button variant="ghost">Login</Button>
        </LoginLink>
        <RegisterLink>
          <Button>Get Started</Button>
        </RegisterLink>
      </div>
    </header>
  );
};

export default Header;
