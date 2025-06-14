"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import UserItem from "./components/UserItem";

export default function Home() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const handleDelete = async (id) => {
    await fetch("/api/users/" + id, { method: "DELETE" });
    setUsers(users.filter((u) => u._id !== id));
  };

  if (!session)
    return (
      <div className="container mt-5 text-center">
        <h3 className="mb-4">🔐 Please Sign In</h3>
        <button className="btn btn-primary" onClick={() => signIn("google")}>
          Sign in with Google
        </button>
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">👋 Welcome, {session.user.name}</h2>
        <button className="btn btn-outline-danger" onClick={() => signOut()}>
          Logout
        </button>
      </div>

      <div className="mb-4 text-start">
        <Link href="/add" className="btn btn-success">
          ➕ Add New User
        </Link>
      </div>

      {users.length === 0 ? (
        <div className="alert alert-info">No users found.</div>
      ) : (
        <ul className="list-group shadow">
          {users.map((u) => (
            <UserItem key={u._id} user={u} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}
