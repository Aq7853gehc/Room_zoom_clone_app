"use client";
import HomeUpcomming from "@/components/HomeUpcomming";
import MeetingTypeList from "@/components/MeetingTypeList";
import React, { useEffect, useState } from "react";

const Home = () => {
  // const now = new Date();
  // const time = now.toLocaleTimeString('en-US',{timeZone: "Asia/Kolkata",hour:"2-digit",minute:"2-digit"});
  // const date = (new Intl.DateTimeFormat("en-US",{
  //   dateStyle:"full",
  //   timeZone: "Asia/Kolkata"
  // })).format(now)


  const [time,setTime]=useState<string>()
  const [date,setDate]=useState<string>()
  useEffect(() => {
    const now = new Date();
    const  t = now.toLocaleTimeString("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
    });
    const d = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeZone: "Asia/Kolkata",
    }).format(now);

    setTime(t)
    setDate(d)
  }, []);

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover ">
        <div className="flex flex-col h-full justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[300px] rounded py-2 px-2 text-center text-base font-normal truncate">
            <HomeUpcomming />{" "}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="font-medium text-lg lg:text-2xl text-sky-1">{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
