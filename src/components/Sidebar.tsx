"use client";

import { sidebar_link } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <section className="w-fit sticky left-0 top-0 flex h-screen flex-col justify-between bg-dark-1 text-white p-6 pt-28 max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebar_link.map((item) => {
          const isActive =
            pathName === item.route || pathName.startsWith(`${item.route}/`);
          return (
            <>
              <Link
                href={item.route}
                key={item.label}
                className={cn(
                  "flex gap-4 items-center p-4 rounded-lg justify-start ",
                  { "bg-blue-1": isActive }
                )}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                />
                <p className="text-lg font-semibold max-lg:hidden">
                  {item.label}
                </p>
              </Link>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
