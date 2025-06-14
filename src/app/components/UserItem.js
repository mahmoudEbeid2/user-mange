"use client";
import Link from "next/link";

export default function UserItem({ user, onDelete }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <Link
          href={`/user/${user._id}`}
          className="text-decoration-none fw-bold text-dark"
        >
          {user.name}
        </Link>
        <div className="text-muted small">{user.email}</div>
      </div>

      <div className="d-flex gap-2">
        <Link
          href={`/update/${user._id}`}
          className="btn btn-sm btn-outline-primary"
        >
          ✏️ Edit
        </Link>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => onDelete(user._id)}
        >
          🗑️ Delete
        </button>
      </div>
    </li>
  );
}
