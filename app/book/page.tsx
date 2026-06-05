"use client";

import { useState } from "react";
import { createBooking } from "./actions";

export default function BookPage() {
  const [name, setName] = useState("");
  const [service, setService] = useState("Hair Cut");
  const [time, setTime] = useState("09:00");

  const handleSubmit = async () => {
    if (!name) {
      alert("Нэрээ оруулна уу");
      return;
    }

    try {
      await createBooking({
        customer: name,
        service,
        time,
      });

      alert("Цаг амжилттай захиалагдлаа ✅");

      setName("");
      setService("Hair Cut");
      setTime("09:00");
    } catch (error) {
      console.log(error);
      alert("Алдаа гарлаа");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-6">
      <div className="w-full max-w-xl bg-zinc-900 p-8 rounded-3xl">
        <h1 className="text-4xl font-bold mb-8">
          Цаг захиалах
        </h1>

        <input
          placeholder="Нэр"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 rounded-xl bg-zinc-800 mb-4"
        />

        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full p-4 rounded-xl bg-zinc-800 mb-4"
        >
          <option>Hair Cut</option>
          <option>Manicure</option>
          <option>Facial</option>
        </select>

        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-4 rounded-xl mb-6 bg-zinc-800"
        >
          <option>09:00</option>
          <option>10:00</option>
          <option>11:00</option>
          <option>12:00</option>
          <option>13:00</option>
          <option>14:00</option>
          <option>15:00</option>
          <option>16:00</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-white text-black p-4 rounded-xl font-bold"
        >
          Цаг захиалах
        </button>
      </div>
    </div>
  );
}