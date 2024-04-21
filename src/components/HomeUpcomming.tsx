"use client";
import { useGetCall } from "@/hooks/useGetCall";
import { Call } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";

const HomeUpcomming = () => {
  const { upcomingCalls } = useGetCall();
  const calls = upcomingCalls[0];
  const router =useRouter()
  return (
    <span onClick={() => router.push(`/meeting/${calls.id}`)} className="cursor-pointer">
      {`${
        calls?.state?.custom?.description?.substring(0, 20) || "No Upcomming"
      } ${calls?.state?.startsAt?.toLocaleString() || ""}`}
    </span>
  );
};

export default HomeUpcomming;
