import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import UsersClientPage from "./users-client";

export default async function Page() {

  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  const role =
    String(user?.publicMetadata?.role)
      .toLowerCase();

  if (role !== "admin") {
    redirect("/admin");
  }

  return <UsersClientPage />;
}
