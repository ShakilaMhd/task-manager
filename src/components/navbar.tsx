"use client"

import { usePathname } from "next/navigation";

import { UserButton } from "@/features/auth/components/user-button";
import MobileSidebar from "./mobile-sidebar";

const pathnameMap = {
  "tasks" : {
    title: "تسک های من",
    description:"تمامی تسک های خودرا اینجا ببینید"
  },
  "projects":{
    title:"پروژه های من",
    description:"تمامی تسک های پروژه خودرا اینجا ببینید"
  }
}

const defaultMap = {
  title:"خانه",
    description:"تمامی  پروژه ها و تسک های خودرا اینجا ببینید"
}

const Navbar = () => {
  const pathname = usePathname()
const pathnameParts = pathname.split("/")
const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap 

const {title, description} = pathnameMap[pathnameKey] || defaultMap

  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
          </div>
          <MobileSidebar />
          <UserButton />
    </nav>
  );
};

export default Navbar;
