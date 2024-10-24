"use client";

import Image from "next/image";
import { IoSearchSharp } from "react-icons/io5";
import logoPath from "../assets/icons8-clapperboard-94.png";
import avatarPath from "../assets/me.jpeg";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <nav className="container px-24 mx-auto flex">
      <div className="flex gap-2 items-center">
        <Image
          src={logoPath}
          alt="logo"
          width={0}
          height={0}
          className="w-6 h-auto"
        />
        <span className="font-semibold">Movie App</span>
      </div>
      <div className="flex items-center">
        <Button>
          <IoSearchSharp className="text-xl" />
        </Button>
        <Image
          src={avatarPath}
          alt="logo"
          width={0}
          height={0}
          className="w-8 h-auto rounded-full"
        />
      </div>
    </nav>
  );
};
