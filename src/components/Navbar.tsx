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
import { RxHamburgerMenu } from "react-icons/rx";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

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
    control,
    handleSubmit,
    formState: { errors },
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
      <div className="md:container px-8 w-full md:px-24 md:mx-auto flex flex-col md:flex-row justify-between">
        <div className="flex gap-4 items-center justify-between md:justify-start">
          <div className="flex gap-2">
            <Image
              src={logoPath}
              alt="logo"
              width={0}
              height={0}
              className="w-6 h-auto"
            />
            <span className="font-semibold md:mr-auto">Movie App</span>
          </div>
          <div className="block md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button>
                  <RxHamburgerMenu />
                </Button>
              </SheetTrigger>
              <SheetContent side={"right"}>
                <div className="flex flex-col items-start mt-8 gap-3 text-sm md:hidden">
                  <Link
                    href="/"
                    className="mr-4 text-slate-800 hover:text-slate-500 dark:hover:text-slate-400 transition"
                  >
                    Home
                  </Link>
                  <Link
                    href="/watchlist"
                    className="mr-4 text-slate-800 hover:text-slate-500 dark:hover:text-slate-400 transition"
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
                          console.log(err)
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
                        <Button className="-ml-2" type="submit">
                          <IoSearchSharp className="text-xl" />
                        </Button>
                      </form>
                      {errors.searchInputValue && (
                        <p className="text-red-900">
                          {errors.searchInputValue.message}
                        </p>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button onClick={toggleDarkMode}>
                    {!isDarkModeOn ? <FaSun /> : <FaMoon />}
                  </Button>
                  <Avatar className="hidden md:block">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="items-center gap-3 text-sm hidden md:flex">
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
                  console.log(err)
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
                <Button className="-ml-2" type="submit">
                  <IoSearchSharp className="text-xl" />
                </Button>
              </form>
              {errors.searchInputValue && (
                <p className="text-red-900">
                  {errors.searchInputValue.message}
                </p>
              )}
            </DialogContent>
          </Dialog>
          <Button onClick={toggleDarkMode}>
            {!isDarkModeOn ? <FaSun /> : <FaMoon />}
          </Button>
          <Avatar className="hidden md:block">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
};
