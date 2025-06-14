"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UpdateUser() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (!id || status !== "authenticated") return;

    fetch("/api/users/" + id)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then(setForm)
      .catch((err) => {
        console.error("Error loading user:", err);
      });
  }, [id, status]);

  const updateUser = async () => {
    if (!form.name || !form.email) return alert("Please fill in all fields.");
    try {
      const res = await fetch("/api/users/" + id, {
        method: "PUT",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to update user");

      router.push("/");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (status === "loading") {
    return <div className="text-center mt-5">Loading session...</div>;
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h3 className="text-center mb-4 text-primary">✏️ Update User</h3>

        <div className="form-group mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter new name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="form-group mb-4">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter new email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={updateUser}>
          💾 Save Changes
        </button>
      </div>
    </div>
  );
}
