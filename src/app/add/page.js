"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { createUser } from "../actions/userActions";

export default function AddUserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); 
    }
  }, [status]);

  const handleAdd = async () => {
    if (!form.name || !form.email) {
      return alert("❌ Please fill in all fields.");
    }

    setLoading(true);
    try {
      await createUser(form);
      router.push("/"); 
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="text-center mt-5">⏳ Loading session...</div>;
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-4 text-success">➕ Add New User</h3>

        <div className="form-group mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter user name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="form-group mb-4">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter user email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <button
          className="btn btn-success w-100"
          onClick={handleAdd}
          disabled={loading}
        >
          {loading ? "⏳ Adding..." : "✅ Add User"}
        </button>
      </div>
    </div>
  );
}
