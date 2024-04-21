"use client";
import { useGetCall } from "@/hooks/useGetCall";
import { Call } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";
import { toast, useToast } from "./ui/use-toast";

const HomeUpcomming = () => {
  const { upcomingCalls } = useGetCall();
  const calls = upcomingCalls[0];
  const router =useRouter()
  const {toast} = useToast();
  return (
    <span onClick={calls?.id?() => router.push(`/meeting/${calls.id}`):()=>{
      toast({title:"No Meetings"})
    }} className="cursor-pointer">
      {`${
        calls?.state?.custom?.description?.substring(0, 20) || "No Upcomming"
      } ${calls?.state?.startsAt?.toLocaleString() || ""}`}
    </span>
  );
};

export default HomeUpcomming;
