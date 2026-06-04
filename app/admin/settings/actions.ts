"use server";

import { prisma } from "@/lib/prisma";

export async function getSettings() {
  let settings = await prisma.setting.findFirst();

  if (!settings) {
    settings = await prisma.setting.create({
      data: {
        businessName: "Time Booking",
        email: "admin@gmail.com",
        phone: "+97699999999",
        openTime: "09:00",
        closeTime: "18:00",
        hairCutPrice: 20,
        makeupPrice: 50,
        nailsPrice: 35,
        notifications: true,
      },
    });
  }

  return settings;
}

export async function saveSettings(data: {
  businessName: string;
  email: string;
  phone: string;
  openTime: string;
  closeTime: string;
  hairCutPrice: number;
  makeupPrice: number;
  nailsPrice: number;
  notifications: boolean;
}) {
  return await prisma.setting.upsert({
    where: {
      id: 1,
    },

    update: data,

    create: {
      id: 1,
      ...data,
    },
  });
}