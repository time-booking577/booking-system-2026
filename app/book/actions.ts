"use server";

import { prisma } from "@/lib/prisma";

export async function createBooking(data: {
  customer: string;
  service: string;
  time: string;
}) {
  return await prisma.booking.create({
    data: {
      customer: data.customer,
      service: data.service,
      time: data.time,
      staff: "admin",
      status: "Pending",
    },
  });
}