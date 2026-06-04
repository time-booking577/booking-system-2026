"use client";

import { useEffect, useState } from "react";
import {
  getSettings,
  saveSettings,
} from "./actions";
import {
  Bell,
  Moon,
  Sun,
  Upload,
  Lock,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const [businessName, setBusinessName] =
    useState("Time Booking");

  const [email, setEmail] =
    useState("admin@gmail.com");

  const [phone, setPhone] =
    useState("+976 99999999");

  const [openTime, setOpenTime] =
    useState("09:00");

  const [closeTime, setCloseTime] =
    useState("18:00");

  const [hairCutPrice, setHairCutPrice] =
    useState("20");

  const [makeupPrice, setMakeupPrice] =
    useState("50");

  const [nailsPrice, setNailsPrice] =
    useState("35");

  const [password, setPassword] =
    useState("");

    useEffect(() => {

  const loadSettings = async () => {

    const data =
      await getSettings();

    setBusinessName(
      data.businessName
    );

    setEmail(data.email);

    setPhone(data.phone);

    setOpenTime(
      data.openTime
    );

    setCloseTime(
      data.closeTime
    );

    setHairCutPrice(
      String(data.hairCutPrice)
    );

    setMakeupPrice(
      String(data.makeupPrice)
    );

    setNailsPrice(
      String(data.nailsPrice)
    );

    setNotifications(
      data.notifications
    );

  };

  loadSettings();

}, []);

  const saveChanges = async () => {

  await saveSettings({
    businessName,
    email,
    phone,
    openTime,
    closeTime,
    hairCutPrice:
      Number(hairCutPrice),

    makeupPrice:
      Number(makeupPrice),

    nailsPrice:
      Number(nailsPrice),

    notifications,
  });

  alert("Settings Saved ✅");
};

  return (
    <div
      className={`
        min-h-screen
        transition-all
        duration-300
        ${
          darkMode
            ? "bg-black text-white"
            : "bg-[#f5f5f5] text-black"
        }
      `}
    >
      {/* TOP */}
      <div className="flex items-center justify-between mb-10">

        <div>
          <h1 className="text-7xl font-black">
            Settings
          </h1>

          <p
            className={`
              text-2xl
              mt-2
              ${
                darkMode
                  ? "text-zinc-400"
                  : "text-zinc-500"
              }
            `}
          >
            Manage your booking system
          </p>
        </div>

        {/* DARK MODE */}
        {/* <button
          onClick={() => setDarkMode(!darkMode)}
          className={`
            h-[70px]
            px-8
            rounded-2xl
            flex
            items-center
            gap-3
            text-xl
            font-bold
            transition-all
            ${
              darkMode
                ? "bg-white text-black"
                : "bg-black text-white"
            }
          `}
        >
          {darkMode ? (
            <>
              <Sun size={24} />
              Light
            </>
          ) : (
            <>
              <Moon size={24} />
              Dark
            </>
          )}
        </button> */}

      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-8">

        {/* BUSINESS INFO */}
        <div
          className={`
            rounded-3xl
            p-8
            border
            ${
              darkMode
                ? "bg-zinc-900 border-zinc-800"
                : "bg-white border-zinc-200"
            }
          `}
        >

          <h2 className="text-4xl font-black mb-8">
            Business Info
          </h2>

          <div className="flex flex-col gap-5">

            <div>
              <p className="text-xl font-bold mb-2">
                Business Name
              </p>

              <input
                value={businessName}
                onChange={(e) =>
                  setBusinessName(e.target.value)
                }
                className={`
                  w-full
                  h-[70px]
                  rounded-2xl
                  px-5
                  text-xl
                  border
                  ${
                    darkMode
                      ? "bg-black border-zinc-700"
                      : "bg-white border-zinc-300"
                  }
                `}
              />
            </div>

            <div>
              <p className="text-xl font-bold mb-2">
                Email
              </p>

              <input
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className={`
                  w-full
                  h-[70px]
                  rounded-2xl
                  px-5
                  text-xl
                  border
                  ${
                    darkMode
                      ? "bg-black border-zinc-700"
                      : "bg-white border-zinc-300"
                  }
                `}
              />
            </div>

            <div>
              <p className="text-xl font-bold mb-2">
                Phone
              </p>

              <input
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className={`
                  w-full
                  h-[70px]
                  rounded-2xl
                  px-5
                  text-xl
                  border
                  ${
                    darkMode
                      ? "bg-black border-zinc-700"
                      : "bg-white border-zinc-300"
                  }
                `}
              />
            </div>

          </div>

        </div>

        {/* BUSINESS HOURS */}
        <div
          className={`
            rounded-3xl
            p-8
            border
            ${
              darkMode
                ? "bg-zinc-900 border-zinc-800"
                : "bg-white border-zinc-200"
            }
          `}
        >

          <h2 className="text-4xl font-black mb-8">
            Business Hours
          </h2>

          <div className="flex gap-5">

            <div className="flex-1">

              <p className="text-xl font-bold mb-2">
                Open Time
              </p>

              <input
                type="time"
                value={openTime}
                onChange={(e) =>
                  setOpenTime(e.target.value)
                }
                className={`
                  w-full
                  h-[70px]
                  rounded-2xl
                  px-5
                  text-xl
                  border
                  ${
                    darkMode
                      ? "bg-black border-zinc-700"
                      : "bg-white border-zinc-300"
                  }
                `}
              />

            </div>

            <div className="flex-1">

              <p className="text-xl font-bold mb-2">
                Close Time
              </p>

              <input
                type="time"
                value={closeTime}
                onChange={(e) =>
                  setCloseTime(e.target.value)
                }
                className={`
                  w-full
                  h-[70px]
                  rounded-2xl
                  px-5
                  text-xl
                  border
                  ${
                    darkMode
                      ? "bg-black border-zinc-700"
                      : "bg-white border-zinc-300"
                  }
                `}
              />

            </div>

          </div>

        </div>

        {/* SERVICE PRICES */}
        <div
          className={`
            rounded-3xl
            p-8
            border
            ${
              darkMode
                ? "bg-zinc-900 border-zinc-800"
                : "bg-white border-zinc-200"
            }
          `}
        >

          <h2 className="text-4xl font-black mb-8">
            Service Prices
          </h2>

          <div className="flex flex-col gap-5">

            <div className="flex gap-4">

              <input
                value="Hair Cut"
                disabled
                className={`
                  flex-1
                  h-[70px]
                  rounded-2xl
                  px-5
                  text-xl
                  border
                  ${
                    darkMode
                      ? "bg-black border-zinc-700"
                      : "bg-white border-zinc-300"
                  }
                `}
              />

              <input
                value={hairCutPrice}
                onChange={(e) =>
                  setHairCutPrice(e.target.value)
                }
                className={`
                  w-[180px]
                  h-[70px]
                  rounded-2xl
                  px-5
                  text-xl
                  border
                  ${
                    darkMode
                      ? "bg-black border-zinc-700"
                      : "bg-white border-zinc-300"
                  }
                `}
              />

            </div>

            <div className="flex gap-4">

              <input
                value="Makeup"
                disabled
                className={`
                  flex-1
                  h-[70px]
                  rounded-2xl
                  px-5
                  text-xl
                  border
                  ${
                    darkMode
                      ? "bg-black border-zinc-700"
                      : "bg-white border-zinc-300"
                  }
                `}
              />

              <input
                value={makeupPrice}
                onChange={(e) =>
                  setMakeupPrice(e.target.value)
                }
                className={`
                  w-[180px]
                  h-[70px]
                  rounded-2xl
                  px-5
                  text-xl
                  border
                  ${
                    darkMode
                      ? "bg-black border-zinc-700"
                      : "bg-white border-zinc-300"
                  }
                `}
              />

            </div>

            <div className="flex gap-4">

              <input
                value="Nails"
                disabled
                className={`
                  flex-1
                  h-[70px]
                  rounded-2xl
                  px-5
                  text-xl
                  border
                  ${
                    darkMode
                      ? "bg-black border-zinc-700"
                      : "bg-white border-zinc-300"
                  }
                `}
              />

              <input
                value={nailsPrice}
                onChange={(e) =>
                  setNailsPrice(e.target.value)
                }
                className={`
                  w-[180px]
                  h-[70px]
                  rounded-2xl
                  px-5
                  text-xl
                  border
                  ${
                    darkMode
                      ? "bg-black border-zinc-700"
                      : "bg-white border-zinc-300"
                  }
                `}
              />

            </div>

          </div>

        </div>

        {/* EXTRA SETTINGS */}
        <div
          className={`
            rounded-3xl
            p-8
            border
            ${
              darkMode
                ? "bg-zinc-900 border-zinc-800"
                : "bg-white border-zinc-200"
            }
          `}
        >

          <h2 className="text-4xl font-black mb-8">
            Extra Settings
          </h2>

          <div className="flex flex-col gap-6">

            {/* NOTIFICATIONS */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <Bell size={28} />

                <p className="text-2xl font-bold">
                  Notifications
                </p>

              </div>

              <button
                onClick={() =>
                  setNotifications(!notifications)
                }
                className={`
                  w-[100px]
                  h-[50px]
                  rounded-full
                  text-lg
                  font-bold
                  ${
                    notifications
                      ? "bg-green-500 text-white"
                      : "bg-zinc-300 text-black"
                  }
                `}
              >
                {notifications ? "ON" : "OFF"}
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={saveChanges}
        className="
          fixed
          bottom-10
          right-10
          h-[80px]
          px-10
          rounded-3xl
          bg-black
          text-white
          text-2xl
          font-black
          flex
          items-center
          gap-3
          shadow-2xl
        "
      >
        <Save size={28} />
        Save Changes
      </button>

    </div>
  );
}