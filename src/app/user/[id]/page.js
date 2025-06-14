"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UserPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (!id || status !== "authenticated") return;

    fetch("/api/users/" + id)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then(setUser)
      .catch((err) => setError(err.message));
  }, [id, status]);

  if (status === "loading")
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Checking session...</p>
      </div>
    );

  if (error)
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">{error}</div>
      </div>
    );

  if (!user)
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading user data...</p>
      </div>
    );

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h3 className="text-center text-info mb-4">👤 User Details</h3>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <hr />
        <p className="text-muted small">User ID: {user._id}</p>
      </div>
    </div>
  );
}
