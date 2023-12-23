"use client";

import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { UserSubmition } from "@/app/page";

export default function ViewAll({ data }: { data: UserSubmition[] }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed left-0 top-0 z-30 p-2">
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        View All
      </Button>
      <AlertDialog open={isOpen}>
        {/* <AlertDialogTrigger>View full list</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>All adonis map entries</AlertDialogTitle>
            <AlertDialogDescription className=" max-h-[50dvh] overflow-auto">
              {data.map((item) => {
                return (
                  <div key={JSON.stringify(item)} className=" mb-4">
                    {item.name} <br /> {item.location} <br />{" "}
                    <a
                      target="_blank"
                      className=" text-blue-500 underline"
                      href={item.skoolAccountLink}
                    >
                      Skool account
                    </a>
                    <br />
                    {item.coords
                      ? JSON.stringify(item.coords)
                      : "error with retrieving coords"}
                  </div>
                );
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
