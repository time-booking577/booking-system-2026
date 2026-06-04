"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import {
  getBookings,
  createBooking,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
} from "./actions";

type Booking = {
  id?: number;
  customer: string;
  service: string;
  time: string;
  status: string;
  staff: string;
};

export default function BookingsPage() {

  const { user } = useUser();

  const role = user?.publicMetadata?.role;

  const [open, setOpen] = useState(false);

  const [editingIndex, setEditingIndex] =
    useState<number | null>(null);

  const [customer, setCustomer] = useState("");
  const [service, setService] = useState("");
  const [time, setTime] = useState("");
  const [staff, setStaff] = useState("");

  const workingHours = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const loadBookings = async () => {

    const data = await getBookings();

    setBookings(data);
  };

  useEffect(() => {

    const fetchData = async () => {
      await loadBookings();
    };

    fetchData();

  }, []);

  const availableTimes = workingHours.filter(
    (hour) =>
      !bookings.some(
        (booking, index) =>
          booking.time === hour &&
          index !== editingIndex
      )
  );

  const saveBooking = async () => {

    if (
      !customer ||
      !service ||
      !time ||
      !staff
    ) return;

    // EDIT
    if (editingIndex !== null) {

      await updateBooking(
        bookings[editingIndex].id!,
        {
          customer,
          service,
          time,
          staff,
          status:
            bookings[editingIndex].status,
        }
      );

      await loadBookings();

      setEditingIndex(null);
    }

    // CREATE
    else {

      await createBooking({
        customer,
        service,
        time,
        staff,
      });

      await loadBookings();
    }

    // RESET
    setCustomer("");
    setService("");
    setTime("");
    setStaff("");
    setOpen(false);
  };

  const updateStatus = async (
    index: number,
    status: string
  ) => {

    await updateBookingStatus(
      bookings[index].id!,
      status
    );

    await loadBookings();
  };

  const removeBooking = async (
    index: number
  ) => {

    await deleteBooking(
      bookings[index].id!
    );

    await loadBookings();
  };

  return (

    <div className="space-y-8">

      {/* TOP */}
      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-7xl font-black">
            Bookings
          </h1>

          <p className="text-zinc-500 text-2xl mt-2">
            Manage all customer bookings
          </p>

        </div>

        {role === "admin" && (

          <button
            onClick={() => setOpen(true)}
            className="
              h-[70px]
              px-8
              rounded-2xl
              bg-black
              text-white
              text-xl
              font-bold
            "
          >
            + New Booking
          </button>

        )}

      </div>

      {/* AVAILABLE TIMES */}
      <div
        className="
          bg-white
          rounded-3xl
          border
          border-zinc-200
          p-8
          shadow-sm
        "
      >

        <h2 className="text-5xl font-black mb-8">
          Available Time Slots
        </h2>

        <div className="flex flex-wrap gap-4">

          {availableTimes.map((hour) => (

            <button
              key={hour}
              onClick={() => setTime(hour)}
              className={`
                px-6
                py-4
                rounded-2xl
                text-xl
                font-bold
                ${
                  time === hour
                    ? "bg-black text-white"
                    : "bg-green-100 text-green-700"
                }
              `}
            >
              {hour}
            </button>

          ))}

        </div>

      </div>

      {/* BOOKINGS */}
      <div
        className="
          bg-white
          rounded-3xl
          border
          border-zinc-200
          p-8
          shadow-sm
        "
      >

        <h2 className="text-5xl font-black mb-8">
          All Bookings
        </h2>

        <div className="space-y-8">

          {bookings.map((booking, index) => (

            <div
              key={booking.id}
              className="
                flex
                items-center
                justify-between
                border-b
                border-zinc-200
                pb-8
              "
            >

              <div>

                <h3 className="text-4xl font-black">
                  {booking.customer}
                </h3>

                <p className="text-2xl text-zinc-500 mt-2">
                  {booking.service} • {booking.time}
                </p>

                <p className="text-zinc-400 mt-2">
                  Staff: {booking.staff}
                </p>

              </div>

              <div className="flex items-center gap-4">

                <button
                  onClick={() =>
                    updateStatus(index, "Confirmed")
                  }
                  className={`
                    px-5
                    py-3
                    rounded-2xl
                    font-bold
                    ${
                      booking.status === "Confirmed"
                        ? "bg-green-200 text-green-700"
                        : "bg-zinc-100 text-zinc-500"
                    }
                  `}
                >
                  Confirmed
                </button>

                <button
                  onClick={() =>
                    updateStatus(index, "Pending")
                  }
                  className={`
                    px-5
                    py-3
                    rounded-2xl
                    font-bold
                    ${
                      booking.status === "Pending"
                        ? "bg-yellow-200 text-yellow-700"
                        : "bg-zinc-100 text-zinc-500"
                    }
                  `}
                >
                  Pending
                </button>

                <button
                  onClick={() =>
                    updateStatus(index, "Cancelled")
                  }
                  className={`
                    px-5
                    py-3
                    rounded-2xl
                    font-bold
                    ${
                      booking.status === "Cancelled"
                        ? "bg-red-200 text-red-700"
                        : "bg-zinc-100 text-zinc-500"
                    }
                  `}
                >
                  Cancelled
                </button>

                <button
                  onClick={() => {
                    setCustomer(booking.customer);
                    setService(booking.service);
                    setTime(booking.time);
                    setStaff(booking.staff);
                    setEditingIndex(index);
                    setOpen(true);
                  }}
                  className="
                    px-5
                    py-3
                    rounded-2xl
                    bg-blue-100
                    text-blue-600
                    font-bold
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() => removeBooking(index)}
                  className="
                    px-5
                    py-3
                    rounded-2xl
                    bg-red-100
                    text-red-600
                    font-bold
                  "
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* MODAL */}
      {open && (

        <div className="
          fixed inset-0 bg-black/40
          flex items-center justify-center
          z-50
        ">

          <div className="
            bg-white
            w-[500px]
            rounded-3xl
            p-8
            space-y-5
          ">

            <h2 className="text-5xl font-black">
              {
                editingIndex !== null
                  ? "Edit Booking"
                  : "New Booking"
              }
            </h2>

            <input
              value={customer}
              onChange={(e) =>
                setCustomer(e.target.value)
              }
              placeholder="Customer"
              className="w-full h-14 border rounded-2xl px-4"
            />

            <input
              value={service}
              onChange={(e) =>
                setService(e.target.value)
              }
              placeholder="Service"
              className="w-full h-14 border rounded-2xl px-4"
            />

            <select
              value={time}
              onChange={(e) =>
                setTime(e.target.value)
              }
              className="w-full h-14 border rounded-2xl px-4"
            >
              <option value="">
                Select Time
              </option>

              {availableTimes.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}

            </select>

            <input
              value={staff}
              onChange={(e) =>
                setStaff(e.target.value)
              }
              placeholder="Staff"
              className="w-full h-14 border rounded-2xl px-4"
            />

            <div className="flex gap-4 pt-4">

              <button
                onClick={() => {
                  setOpen(false);
                  setEditingIndex(null);
                }}
                className="
                  flex-1
                  h-14
                  rounded-2xl
                  bg-zinc-200
                  font-bold
                "
              >
                Cancel
              </button>

              <button
                onClick={saveBooking}
                className="
                  flex-1
                  h-14
                  rounded-2xl
                  bg-black
                  text-white
                  font-bold
                "
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}