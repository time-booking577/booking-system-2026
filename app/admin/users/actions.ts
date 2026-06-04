"use server";

import { prisma } from "../../../lib/prisma";

export async function getUsers() {
  return await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createUser(data: {
  name: string;
  email: string;
  phone: string;
  role: string;
}) {
  return await prisma.user.create({
    data,
  });
}

export async function updateUser(
  id: number,
  data: {
    name: string;
    email: string;
    phone: string;
    role: string;
  }
) {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteUser(id: number) {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
}