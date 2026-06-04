"use client";

import { useEffect, useState } from "react";

import {
  Search,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
};

export default function UsersPage() {

  const [open, setOpen] = useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const [users, setUsers] =
    useState<User[]>([]);

  // LOAD USERS

  const loadUsers = async () => {

  const res = await fetch("/api/users", {
    cache: "no-store",
  });

  const data = await res.json();

  setUsers(data);

};

  useEffect(() => {

  const fetchUsers = async () => {
    await loadUsers();
  };

  fetchUsers();

}, []);
  // ADD USER

  const addUser = async () => {

    if (
      !name ||
      !email ||
      !phone ||
      !role
    ) return;

    await fetch("/api/users", {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        phone,
        role,
      }),
    });

    await loadUsers();

    setName("");
    setEmail("");
    setPhone("");
    setRole("");

    setOpen(false);

  };

  // DELETE USER

  const deleteUser = async (
  id: number
) => {

  await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });

  await loadUsers();

};

  // EDIT USER

  const editUser = (user: User) => {

    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setRole(user.role);

    setEditingId(user.id);

    setOpen(true);

  };

  // SAVE EDIT

  const saveEdit = async () => {

  if (editingId === null) return;

  const res = await fetch(
    `/api/users/${editingId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        phone,
        role,
      }),
    }
  );

  if (!res.ok) {
    alert("Edit failed");
    return;
  }

  await loadUsers();

  setName("");
  setEmail("");
  setPhone("");
  setRole("");

  setEditingId(null);

  setOpen(false);

};

  // SEARCH

  const filteredUsers =
    users.filter((user) =>
      user.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div>

      {/* TOP */}

      <div className="flex items-center justify-between mb-10">

        <div>

          <h1 className="text-7xl font-black">
            Users
          </h1>

          <p className="text-zinc-500 text-2xl mt-2">
            Manage all users
          </p>

        </div>

        <button
          onClick={() => {

            setOpen(true);

            setEditingId(null);

            setName("");
            setEmail("");
            setPhone("");
            setRole("");

          }}
          className="
            h-[70px]
            px-8
            rounded-2xl
            bg-black
            text-white
            text-xl
            font-bold
            flex
            items-center
            gap-3
          "
        >

          <Plus size={24} />

          Add User

        </button>

      </div>

      {/* SEARCH */}

      <div
        className="
          bg-white
          border
          border-zinc-200
          rounded-3xl
          h-[80px]
          px-6
          flex
          items-center
          gap-4
          mb-8
          shadow-sm
        "
      >

        <Search
          size={28}
          className="text-zinc-400"
        />

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            flex-1
            h-full
            outline-none
            text-2xl
          "
        />

      </div>

      {/* USER COUNT */}

      <div className="mb-6">

        <p className="text-xl text-zinc-500">

          Total Users:

          <span className="font-bold text-black ml-2">

            {users.length}

          </span>

        </p>

      </div>

      {/* USERS */}

      <div className="flex flex-col gap-6">

        {filteredUsers.map((user) => (

          <div
            key={user.id}
            className="
              bg-white
              border
              border-zinc-200
              rounded-3xl
              p-8
              shadow-sm
              flex
              items-center
              justify-between
            "
          >

            {/* LEFT */}

            <div className="flex items-center gap-6">

              {/* AVATAR */}

              <div
                className="
                  w-[80px]
                  h-[80px]
                  rounded-full
                  bg-black
                  text-white
                  flex
                  items-center
                  justify-center
                  text-3xl
                  font-black
                "
              >

                {user.name.charAt(0)}

              </div>

              {/* INFO */}

              <div>

                <h2 className="text-4xl font-black">

                  {user.name}

                </h2>

                <div className="mt-1">

                  <p className="text-zinc-500 text-xl">

                    {user.email}

                  </p>

                  <p className="text-zinc-400 text-lg">

                    {user.phone}

                  </p>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-4">

              {/* ROLE */}

              <span
                className={`
                  px-5
                  py-3
                  rounded-full
                  text-lg
                  font-bold
                  ${
                    user.role === "Admin"
                      ? "bg-red-100 text-red-600"
                      : user.role === "Staff"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }
                `}
              >

                {user.role}

              </span>

              {/* EDIT */}

              <button
                onClick={() =>
                  editUser(user)
                }
                className="
                  w-[55px]
                  h-[55px]
                  rounded-2xl
                  bg-blue-100
                  text-blue-600
                  flex
                  items-center
                  justify-center
                "
              >

                <Pencil size={22} />

              </button>

              {/* DELETE */}

              <button
                onClick={() =>
                  deleteUser(user.id)
                }
                className="
                  w-[55px]
                  h-[55px]
                  rounded-2xl
                  bg-red-100
                  text-red-600
                  flex
                  items-center
                  justify-center
                "
              >

                <Trash2 size={22} />

              </button>

            </div>

          </div>

        ))}

      </div>

      {/* MODAL */}

      {open && (

        <div
          className="
            fixed
            inset-0
            bg-black/40
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-50
          "
        >

          <div
            className="
              w-[600px]
              bg-white
              rounded-3xl
              p-10
              shadow-2xl
            "
          >

            <h2 className="text-5xl font-black mb-8">

              {editingId !== null
                ? "Edit User"
                : "Add User"}

            </h2>

            <div className="flex flex-col gap-5">

              {/* NAME */}

              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="
                  h-[70px]
                  rounded-2xl
                  border
                  border-zinc-300
                  px-5
                  text-xl
                "
              />

              {/* EMAIL */}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                  h-[70px]
                  rounded-2xl
                  border
                  border-zinc-300
                  px-5
                  text-xl
                "
              />

              {/* PHONE */}

              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="
                  h-[70px]
                  rounded-2xl
                  border
                  border-zinc-300
                  px-5
                  text-xl
                "
              />

              {/* ROLE */}

              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                className="
                  h-[70px]
                  rounded-2xl
                  border
                  border-zinc-300
                  px-5
                  text-xl
                  bg-white
                "
              >

                <option value="">
                  Select Role
                </option>

                <option value="Admin">
                  Admin
                </option>

                <option value="Staff">
                  Staff
                </option>

                <option value="Customer">
                  Customer
                </option>

              </select>

            </div>

            {/* BUTTONS */}

            <div className="flex gap-4 mt-8">

              <button
                onClick={() => {

                  setOpen(false);

                  setEditingId(null);

                }}
                className="
                  flex-1
                  h-[70px]
                  rounded-2xl
                  bg-zinc-200
                  text-xl
                  font-bold
                "
              >

                Cancel

              </button>

              <button
                onClick={
                  editingId !== null
                    ? saveEdit
                    : addUser
                }
                className="
                  flex-1
                  h-[70px]
                  rounded-2xl
                  bg-black
                  text-white
                  text-xl
                  font-bold
                "
              >

                {editingId !== null
                  ? "Save Changes"
                  : "Add User"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}