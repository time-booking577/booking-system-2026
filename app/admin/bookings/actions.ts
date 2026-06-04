"use server";

import { prisma } from "../../../lib/prisma";

export async function getBookings() {
  return await prisma.booking.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createBooking(data: {
  customer: string;
  service: string;
  time: string;
  staff: string;
}) {
  return await prisma.booking.create({
    data: {
      customer: data.customer,
      service: data.service,
      time: data.time,
      staff: data.staff,
      status: "Pending",
    },
  });
}

export async function updateBooking(
  id: number,
  data: {
    customer: string;
    service: string;
    time: string;
    staff: string;
    status: string;
  }
) {
  return await prisma.booking.update({
    where: {
      id,
    },
    data: {
      customer: data.customer,
      service: data.service,
      time: data.time,
      staff: data.staff,
      status: data.status,
    },
  });
}

export async function updateBookingStatus(
  id: number,
  status: string
) {
  return await prisma.booking.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
}

export async function deleteBooking(id: number) {
  return await prisma.booking.delete({
    where: {
      id,
    },
  });
}