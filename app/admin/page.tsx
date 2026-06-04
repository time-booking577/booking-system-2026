import { prisma } from "../../lib/prisma";

export default async function DashboardPage() {

  const bookings = await prisma.booking.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalBookings = bookings.length;

  const confirmedBookings = bookings.filter(
    (b) => b.status === "Confirmed"
  ).length;

  const pendingBookings = bookings.filter(
    (b) => b.status === "Pending"
  ).length;

  const cancelledBookings = bookings.filter(
    (b) => b.status === "Cancelled"
  ).length;

  const revenue = confirmedBookings * 50;

  const availableSlots = 10 - pendingBookings;

  return (
    <div className="space-y-8">

      {/* TOP */}
      <div>
        <h1 className="text-7xl font-black">
          Dashboard
        </h1>

        <p className="text-zinc-500 text-2xl mt-2">
          Booking system overview
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6">

        <div
          className="
            bg-white
            rounded-3xl
            p-8
            border
            border-zinc-200
            shadow-sm
            hover:shadow-xl
            duration-300
          "
        >
          <p className="text-zinc-500 text-xl">
            Total Bookings
          </p>

          <h2 className="text-6xl font-black mt-3">
            {totalBookings}
          </h2>
        </div>

        <div
          className="
            bg-white
            rounded-3xl
            p-8
            border
            border-zinc-200
            shadow-sm
            hover:shadow-xl
            duration-300
          "
        >
          <p className="text-zinc-500 text-xl">
            Confirmed
          </p>

          <h2 className="text-6xl font-black mt-3">
            {confirmedBookings}
          </h2>
        </div>

        <div
          className="
            bg-white
            rounded-3xl
            p-8
            border
            border-zinc-200
            shadow-sm
            hover:shadow-xl
            duration-300
          "
        >
          <p className="text-zinc-500 text-xl">
            Revenue
          </p>

          <h2 className="text-6xl font-black mt-3">
            ${revenue}
          </h2>
        </div>

        <div
          className="
            bg-white
            rounded-3xl
            p-8
            border
            border-zinc-200
            shadow-sm
            hover:shadow-xl
            duration-300
          "
        >
          <p className="text-zinc-500 text-xl">
            Available Slots
          </p>

          <h2 className="text-6xl font-black mt-3">
            {availableSlots}
          </h2>
        </div>

      </div>

      {/* MIDDLE */}
      <div className="grid grid-cols-2 gap-6">

        {/* CHART */}
        <div
          className="
            bg-white
            rounded-3xl
            p-8
            border
            border-zinc-200
            shadow-sm
          "
        >

          <h2 className="text-5xl font-black mb-8">
            Booking Status
          </h2>

          <div className="flex items-end gap-6 h-[300px]">

            <div className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-green-500 rounded-t-3xl"
                style={{
                  height: `${confirmedBookings * 60 + 40}px`,
                }}
              ></div>

              <p className="mt-3 text-zinc-500 font-bold">
                Confirmed
              </p>
            </div>

            <div className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-yellow-400 rounded-t-3xl"
                style={{
                  height: `${pendingBookings * 60 + 40}px`,
                }}
              ></div>

              <p className="mt-3 text-zinc-500 font-bold">
                Pending
              </p>
            </div>

            <div className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-red-500 rounded-t-3xl"
                style={{
                  height: `${cancelledBookings * 60 + 40}px`,
                }}
              ></div>

              <p className="mt-3 text-zinc-500 font-bold">
                Cancelled
              </p>
            </div>

          </div>

        </div>

        {/* SCHEDULE */}
        <div
          className="
            bg-white
            rounded-3xl
            p-8
            border
            border-zinc-200
            shadow-sm
          "
        >

          <h2 className="text-5xl font-black mb-8">
            Today Schedule
          </h2>

          <div className="space-y-5">

            {bookings.slice(0, 3).map((booking) => (
              <div
                key={booking.id}
                className="flex justify-between items-center bg-zinc-100 p-5 rounded-2xl"
              >
                <div>
                  <h3 className="text-3xl font-black">
                    {booking.customer}
                  </h3>

                  <p className="text-zinc-500 text-xl">
                    {booking.service}
                  </p>
                </div>

                <p className="text-3xl font-black">
                  {booking.time}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>

      {/* RECENT BOOKINGS */}
      <div
        className="
          bg-white
          rounded-3xl
          p-8
          border
          border-zinc-200
          shadow-sm
        "
      >

        <h2 className="text-6xl font-black mb-8">
          Recent Bookings
        </h2>

        <div className="space-y-6">

          {bookings.map((booking) => (

            <div
              key={booking.id}
              className="flex items-center justify-between border-b pb-6"
            >

              <div>
                <h3 className="text-4xl font-black">
                  {booking.customer}
                </h3>

                <p className="text-zinc-500 text-2xl mt-1">
                  {booking.service} • {booking.time}
                </p>
              </div>

              <span
                className={`
                  px-6
                  py-3
                  rounded-full
                  text-xl
                  font-bold

                  ${
                    booking.status === "Confirmed"
                      ? "bg-green-100 text-green-600"
                      : booking.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }
                `}
              >
                {booking.status}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}