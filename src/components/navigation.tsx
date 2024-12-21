import { cn } from "@/lib/utils";
import { SettingsIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";

const routes = [
  {
    label: "خانه",
    href: "",
    icon: GoHome,
    activIcon: GoHomeFill,
  },
  {
    label: "تسک های من",
    href: "/tasks",
    icon: GoCheckCircle,
    activIcon: GoCheckCircleFill,
  },
  {
    label: "تنظیمات",
    href: "/settings",
    icon: SettingsIcon,
    activIcon: SettingsIcon,
  },

  {
    label: "اعضا",
    href: "/members",
    icon: UsersIcon,
    activIcon: UsersIcon,
  },
];

export const Navigation = () => {
  return (
    <ul className="flex flex-col">
      {routes.map((item) => {
        const isActive = false;
        const Icon = isActive ? item.activIcon : item.icon;

        return (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <Icon className="size-5 text-neutral-500" />
              {item.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};
