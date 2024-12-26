import Image from "next/image";
import Link from "next/link";
import { DottedSeparator } from "./dotted-separator";
import { Navigation } from "./navigation";
import { WorkSpaceSwitcher } from "./WorkSpaceSwitcher";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/">
        <Image
          src="./logo1.svg"
          alt="logo"
          width={50}
          height={48}
          className="mr-10"
        ></Image>
      </Link>
      <div className="my-5">
        <DottedSeparator />
      </div>
      <WorkSpaceSwitcher />
      <div className="my-5">
        <DottedSeparator />
      </div>
      <Navigation />
    </aside>
  );
};
("");
