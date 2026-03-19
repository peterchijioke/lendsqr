import { tokenStorage } from "@/services/cookie.service";
import { NextResponse } from "next/server";

const VALID_EMAIL = "okon@sqr.com";
const VALID_PASSWORD = "admin@123";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate credentials
    if (email.trim() !== VALID_EMAIL || password.trim() !== VALID_PASSWORD) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const loginResponse = {
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: "65f02d6c9d92",
          firstName: "Akpan",
          lastName: "Okon",
          username: "admin_admin",
          email: "okon@sqr.com",
          organization: "LendSqr",
          tier: 2,
          accountNumber: "1029384756",
          bankName: "GTBank",
          status: "active",
        },
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock.payload.signature",
      },
    };

    await tokenStorage.set(loginResponse.data.accessToken);

    return NextResponse.json(loginResponse.data.user);
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request" },
      { status: 400 }
    );
  }
}
