import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";

const signupSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(320),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = signupSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please enter a valid name and email." },
        { status: 400 }
      );
    }

    const name = result.data.name;
    const email = result.data.email.toLowerCase();

    const inserted = await sql`
      INSERT INTO waitlist_signups (name, email)
      VALUES (${name}, ${email})
      ON CONFLICT (LOWER(email))
      DO NOTHING
      RETURNING id;
    `;

    if (inserted.length === 0) {
      return NextResponse.json(
        { error: "This email is already on the list." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}