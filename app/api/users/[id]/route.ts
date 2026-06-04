import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function PUT(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {

    const { id } =
      await context.params;

    const body =
      await request.json();

    const user =
      await prisma.user.update({
        where: {
          id: Number(id),
        },

        data: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          role: body.role,
        },
      });

    return NextResponse.json(user);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to update user",
      },
      {
        status: 500,
      }
    );

  }
}

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {

    const { id } =
      await context.params;

    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to delete user",
      },
      {
        status: 500,
      }
    );

  }
}