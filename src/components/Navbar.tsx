"use client";

import {
  GlobalStateType,
  useGlobalState,
} from "@/app/providers/GlobalStateContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaMoon, FaSun } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { z } from "zod";
import logoPath from "../assets/icons8-clapperboard-94.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";

const searchFormSchema = z.object({
  searchInputValue: z
    .string()
    .min(1, { message: "Enter movie name to search" }),
  pageParam: z.number(),
});

type SearchFormDataType = z.infer<typeof searchFormSchema>;

export const Navbar = () => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDarkModeOn, setIsDarkModeOn] = useState(true);

  const { setGlobalState } = useGlobalState();
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors, isSumitting, isSubmitSuccessful },
  } = useForm<SearchFormDataType>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchInputValue: "",
      pageParam: 1,
    },
  });

  const handleSubmitFormData = async (formData: SearchFormDataType) => {
    setGlobalState((prev: GlobalStateType) => ({
      ...prev,
      isSearching: true,
      searchInputValue: formData.searchInputValue,
    }));
    setIsDialogOpen(false);
    router.push("/");
  };

  const toggleDarkMode = () => {
    window.document.body.classList.toggle("dark");
    setIsDarkModeOn((prev) => !prev);
  };

  return (
    <nav className="mb-8 h-16 border-b-[1px] border-b-slate-300 dark:border-b-slate-800 flex items-center">
      <div className="container px-24 mx-auto flex justify-between">
        <div className="flex gap-4 items-center">
          <Image
            src={logoPath}
            alt="logo"
            width={0}
            height={0}
            className="w-6 h-auto"
          />
          <span className="font-semibold">Movie App</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/"
            className="mr-4 hover:text-slate-500 dark:hover:text-slate-400 transition"
          >
            Home
          </Link>
          <Link
            href="/watchlist"
            className="mr-4 hover:text-slate-500 dark:hover:text-slate-400 transition"
          >
            Watchlist
          </Link>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <IoSearchSharp className="text-xl" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form
                onSubmit={handleSubmit(handleSubmitFormData, (err) =>
                  console.log(err),
                )}
                className="flex w-full max-w-sm items-center space-x-2"
              >
                <Controller
                  name="searchInputValue"
                  control={control}
                  render={({ field }) => {
                    return <Input placeholder="" {...field} />;
                  }}
                />
                <Button className="-ml-2" type="submit" disabled={isSumitting}>
                  <IoSearchSharp className="text-xl" />
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Button onClick={toggleDarkMode}>
            {!isDarkModeOn ? <FaSun /> : <FaMoon />}
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
};
