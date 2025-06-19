import connectDB from "@/lib/db";
import User from "@/models/User";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export async function GET() {
  try {
    await connectDB();
    const users = await User.find();
    return Response.json(users);
  } catch (error) {
    console.error("❌ GET /api/users error:", error);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const parsed = userSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: "Invalid data" }, { status: 400 });
    }

    await connectDB();
    const user = await User.create(body);
    return Response.json(user);
  } catch (error) {
    console.error("❌ POST /api/users error:", error);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
