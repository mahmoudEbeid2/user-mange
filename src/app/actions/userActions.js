export async function createUser(form) {
  const res = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(form),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create user");
  }

  return await res.json();
}
