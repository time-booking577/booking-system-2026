"use client";

import Link from "next/link";
import { usePathname, redirect } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Settings,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const { user, isLoaded } = useUser();

  // LOADING
  if (!isLoaded) {
    return null;
  }

  // NOT LOGGED IN
  if (!user) {
    redirect("/sign-in");
  }

  // ROLE
  const role = user.publicMetadata.role;

  // BLOCK CUSTOMER
  if (role !== "admin" && role !== "staff") {
    redirect("/");
  }

  // NAV ITEMS
  const navItems =
    role === "admin"
      ? [
          {
            name: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
          },
          {
            name: "Bookings",
            href: "/admin/bookings",
            icon: CalendarDays,
          },
          {
            name: "Users",
            href: "/admin/users",
            icon: Users,
          },
          {
            name: "Settings",
            href: "/admin/settings",
            icon: Settings,
          },
        ]
      : [
          {
            name: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
          },
          {
            name: "Bookings",
            href: "/admin/bookings",
            icon: CalendarDays,
          },
        ];

  return (
    <div className="min-h-screen flex bg-[#f5f5f5] text-black">
      
      {/* SIDEBAR */}
      <aside className="w-[260px] bg-white border-r border-zinc-200 px-5 py-10 flex flex-col justify-between">

        <div>
          <h1 className="text-5xl font-black leading-none mb-12">
            Time
            <br />
            Booking
          </h1>

          <div className="flex flex-col gap-4">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-4
                    h-[72px]
                    px-5
                    rounded-2xl
                    text-xl
                    font-semibold
                    transition-all
                    ${
                      active
                        ? "bg-black text-white"
                        : "bg-white border border-zinc-200 hover:bg-zinc-100"
                    }
                  `}
                >
                  <Icon size={24} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* USER */}
        <div className="mt-10 flex items-center gap-4 border border-zinc-200 rounded-2xl p-4 bg-white">
          <UserButton />

          <div>
            <p className="font-semibold">
              {user.firstName || "User"}
            </p>

            <p className="text-sm text-zinc-500 capitalize">
              {String(role)}
            </p>
          </div>
        </div>

      </aside>

      {/* MAIN */}
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}